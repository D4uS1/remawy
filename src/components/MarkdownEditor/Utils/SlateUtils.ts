import { CustomEditor } from '../Types/CustomEditor';
import { Editor, Node, Point, Transforms, Element, Text } from 'slate';
import { CustomElement, CustomElementType } from '../Types/CustomElement';
import { CustomText } from '../Types/CustomText';

/**
 * Changes the type of the current node to the specified elementType.
 * The content will not be changed.
 *
 * @param editor
 * @param elementType
 */
const changeCurrentNodeType = (editor: CustomEditor, elementType: CustomElementType) => {
    Transforms.setNodes(editor, { type: elementType });
};

/**
 * Creates a new node of the same type at the current cursors position.
 *
 * @param editor
 */
const createNewNodeOfCurrentType = (editor: CustomEditor) => {
    // Splitting should force the editor to create a new node
    Transforms.splitNodes(editor, { always: true });
};

/**
 * Creates a new node having the specified type at the current cursors position.
 * The props are passed to the node. This can eg. be the src attribute for the image, or the href attribute
 * for the hyperlink.
 *
 * @param editor
 * @param type
 * @param props
 */
const createNewNode = (editor: CustomEditor, type: CustomElementType, props?: Record<string, unknown>) => {
    Transforms.insertNodes(editor, [{ type: type, ...props }]);
};

/**
 * Wraps the node of the current editors position in a new node of the specified elementType.
 *
 * @param editor
 * @param elementType
 */
const wrapNode = (editor: CustomEditor, elementType: CustomElementType) => {
    Transforms.wrapNodes(editor, { type: elementType });
};

/**
 * Unwraps the current node (not leaf) at the editors selection, hence the current node is located in the parent.
 *
 * @param editor
 */
const unwrapNode = (editor: CustomEditor) => {
    Transforms.liftNodes(editor);
};

/**
 * Unwraps the current leaf at the editors selection, hence the current leaf is located in the parent node.
 *
 * @param editor
 */
const unwrapLeaf = (editor: CustomEditor) => {
    Transforms.unwrapNodes(editor);
};

/**
 * Returns whether the editors selection is a cursor, meaining the user did not select any text,
 * but is located somewhere in the editor.
 *
 * @param editor
 */
const isCursor = (editor: CustomEditor): boolean => {
    if (!editor.selection) {
        return false;
    }

    return Point.equals(editor.selection.anchor, editor.selection.focus);
};

/**
 * Returns whether the user selected some text.
 *
 * @param editor
 */
const isSelection = (editor: CustomEditor): boolean => {
    if (!editor.selection) {
        return false;
    }

    return !isCursor(editor);
};

/**
 * Returns the start location of the current selected block.
 *
 * @param editor
 */
const currentBlockStart = (editor: CustomEditor): Point => {
    // Get the nearest block from the selection
    const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n as CustomElement)
    });

    // The path to the block is located in the second item of the result
    const path = block ? block[1] : [];

    // Find the start point of the block
    return Editor.start(editor, path);
};

/**
 * Returns the end location of the current seleczed block.
 *
 * @param editor
 */
const currentBlockEnd = (editor: CustomEditor): Point => {
    // Get the nearest block from the selection
    const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n as CustomElement)
    });

    // The path to the block is located in the second item of the result
    const path = block ? block[1] : [];

    // Find the end point of the block
    return Editor.end(editor, path);
};

/**
 * Returns the text from the start of the block of the current cursor in the specified slate editor.
 * Returns null if the text could not be found.
 *
 * @param editor
 */
const textSinceBlockStart = (editor: CustomEditor): string | null => {
    if (!editor.selection || !isCursor(editor)) {
        return null;
    }

    // Find the start point of the block
    const start = currentBlockStart(editor);

    // Build a range object from the current selection to the start point
    const range = { anchor: editor.selection.anchor, focus: start };

    // extract the text from the range
    return Editor.string(editor, range);
};

/**
 * Returns the text from the current cursor of the slate editor to the block end.
 * Returns null if the text could not be found.
 *
 * @param editor
 */
const textToBlockEnd = (editor: CustomEditor): string | null => {
    if (!editor.selection || !isCursor(editor)) {
        return null;
    }

    // Find the end point of the block
    const end = currentBlockEnd(editor);

    // Build a range object from the current selection to the start point
    const range = { anchor: editor.selection.focus, focus: end };

    // extract the text from the range
    return Editor.string(editor, range);
};

/**
 * Returns the location of the last occurence of the specified text from the editors current selection start
 * in the block of the current selection.
 * This only works if the current selection has the same anchor and focus, meaning the user did not select any text.
 *
 * If the isolated option is passed, the position is only returned if the occurence is not beside the searchText itself.
 * This means for instance, if you search for _ and the text contains __, the position of _ will not be returned.
 * The position will only be returned if the text is surrounded not by the search text.
 * Note that if isolated is passed, it will only check the isolation for the last found occurence. If the text contains some
 * isolated characters before that occurence, they will not be found.
 *
 * @param editor
 * @param searchText
 */
const lastPosOf = (editor: CustomEditor, searchText: string, options?: { isolated?: true }): Point | null => {
    if (!editor.selection || !isCursor(editor)) {
        return null;
    }

    // Select the text between start of the block and the current cursor position
    const blockText = currentBlockText(editor);
    if (!blockText) {
        return null;
    }

    // Find last occurence of search text
    const lastIndex = blockText.lastIndexOf(searchText);

    // If the isolated option is set to true, the searchText must not beside searchText
    if (options?.isolated) {
        if (blockText.substring(lastIndex + searchText.length, lastIndex + searchText.length * 2) === searchText) {
            return null;
        }

        if (blockText.substring(lastIndex - searchText.length, lastIndex) === searchText) {
            return null;
        }
    }

    if (lastIndex === -1) {
        return null;
    }

    return {
        path: editor.selection.anchor.path,
        offset: lastIndex
    };
};

/**
 * Returns whether the current cursor is behind the specified searchText, meaninig that the searchText is
 * left beside the cursor.
 * If the user has currently selected text, false will be returned.
 *
 * @param editor
 * @param searchText
 */
const cursorIsBehind = (editor: CustomEditor, searchText: string): boolean => {
    if (!editor.selection || !isCursor(editor)) {
        return false;
    }

    return !!textSinceBlockStart(editor)?.endsWith(searchText);
};

/**
 * Returns the text of the block the user has currently selected.
 * If the user has not selected anything, null will be returned.
 *
 * @param editor
 */
const currentBlockText = (editor: CustomEditor): string | null => {
    if (!editor.selection) {
        return null;
    }

    // Select the text between start of the block and the current cursor position
    return Editor.string(editor, {
        anchor: { path: editor.selection.anchor.path, offset: 0 },
        focus: editor.selection.anchor
    });
};

/**
 * Sets the text of the block the user has currently selected.
 *
 * @param editor
 * @param text
 */
const setCurrentBlockText = (editor: CustomEditor, text: string): void => {
    if (!editor.selection) {
        return;
    }

    const start = currentBlockStart(editor);
    if (!start) return;

    Transforms.delete(editor, {
        at: {
            anchor: start,
            focus: editor.selection.anchor
        }
    });

    Transforms.insertText(editor, text, {
        at: start
    });
};

/**
 * Removes the number of chars from the beginning of the block that is currently selected by the user.
 *
 * @param editor
 * @param numChars
 */
const deleteFromLeft = (editor: CustomEditor, numChars: number): void => {
    let text = currentBlockText(editor);
    if (!text) {
        return;
    }

    text = text.slice(numChars);

    setCurrentBlockText(editor, text);
};

/**
 * Removes the number of chars from the current cursor in the editor (backwards).
 *
 * @param editor
 * @param numChars
 */
const deleteFromRight = (editor: CustomEditor, numChars: number): void => {
    for (let i = 0; i < numChars; i++) {
        Editor.deleteBackward(editor, { unit: 'character' });
    }
};

/**
 * Removes numChars characters from the text starting at the specified start point.
 *
 * @param editor
 * @param start
 * @param numChars
 */
const deleteAt = (editor: CustomEditor, start: Point, numChars: number) => {
    Transforms.delete(editor, {
        at: start,
        distance: numChars,
        unit: 'character'
    });
};

/**
 * Checks whether the cursor is in a node being a child of a node having the specified type elementType.
 * This checks recursively in the tree, not only one parent.
 * This only works for cursors, not for text selections. If the user selected some text, false will always be returned.
 *
 * @param editor
 * @param elementType
 */
const isChildOf = (editor: CustomEditor, elementType: CustomElementType): boolean => {
    if (!isCursor(editor) || !editor.selection) {
        return false;
    }

    return (
        Editor.above(editor, {
            match: (n) => (n as Element).type === elementType
        }) !== undefined
    );
};

/**
 * Returns the current element of the cursor the user is currently located.
 * If the user selected some text or the element could not be found, null will be returned.
 * Note that this method does not return leafes. It only returns the nearest element the user is located in.
 *
 * @param editor
 */
const currentElement = (editor: CustomEditor): CustomElement | null => {
    if (!isCursor(editor) || !editor.selection) {
        return null;
    }

    const nodeEntry = Editor.above(editor, { match: (n) => Editor.isBlock(editor, n as CustomElement) });
    if (!nodeEntry) {
        return null;
    }

    if (!isElement(nodeEntry[0])) {
        return null;
    }

    return nodeEntry[0] as CustomElement;
};

/**
 * Returns the path to the current element, meaning the next element not being a leaf.
 * If the user selected some text of the path could not be found, null will be returned.
 *
 * @param editor
 */
const currentElementPath = (editor: CustomEditor): number[] | null => {
    if (!isCursor(editor) || !editor.selection) {
        return null;
    }

    // This is based on the assumption that the users cursor is always in some leaf node
    return editor.selection.anchor.path.slice(0, -1);
};

/**
 * Returns the type name of the node the user is currently located in.
 * If the user selected some text or the type could not be found, null will be returned.
 *
 * @param editor
 */
const currentElementType = (editor: CustomEditor): CustomElementType | null => {
    if (!isCursor(editor) || !editor.selection) {
        return null;
    }

    const element = currentElement(editor);
    if (!element) {
        return null;
    }

    return element.type;
};

/**
 * Returns the parent element of the current cursors position in the editor.
 * If the user selected some text or the parent could not be specified, null will be returned.
 * Note that this method does not return leafes. It only returns the nearest parent of
 * the element the user is located in.
 *
 * @param editor
 */
const parentElement = (editor: CustomEditor): CustomElement | null => {
    if (!isCursor(editor) || !editor.selection) {
        return null;
    }

    const currentPath = currentElementPath(editor);
    if (!currentPath) {
        return null;
    }

    const parentEntry = Editor.parent(editor, currentPath);
    if (!parentEntry) {
        return null;
    }

    if (!isElement(parentEntry[0])) {
        return null;
    }

    return parentEntry[0] as CustomElement;
};

/**
 * Returns the type of the parent of the current cursors position in the editor.
 * If the user selected some text or the parent could not be specified, null will be returned.
 *
 * @param editor
 */
const parentElementType = (editor: CustomEditor): CustomElementType | null => {
    if (!isCursor(editor)) {
        return null;
    }

    const element = parentElement(editor);
    if (!element) {
        return null;
    }

    return element.type;
};

/**
 * Returns the leaf at the current editors cursor.
 * If the user selected some text or the leaf could not be found, null will be returned.
 *
 * @param editor
 */
const currentLeaf = (editor: CustomEditor): CustomText | null => {
    if (!isCursor(editor) || !editor.selection) {
        return null;
    }

    const nodeEntry = Editor.node(editor, editor.selection.anchor);
    if (!nodeEntry || !isLeaf(nodeEntry[0])) {
        return null;
    }

    return nodeEntry[0] as CustomText;
};

/**
 * Returns whether the specified node is an element.
 *
 * @param node
 */
const isElement = (node: Node): boolean => {
    // assuming that if a type is available, it is an element
    const element = node as CustomElement;
    if (element && element['type']) {
        return true;
    }

    return false;
};

/**
 * Returns whether the specified node is a leaf node having only text.
 *
 * @param node
 */
const isLeaf = (node: Node): boolean => {
    // assuming that if a text is available, it is an leaf
    const leaf = node as CustomText;
    if (leaf && leaf['text']) {
        return true;
    }

    return false;
};

/**
 * Returns whether the current selection in the editor is at the root node,
 * meaning not being wrapped in any element.
 *
 * @param editor
 */
const isAtRoot = (editor: CustomEditor): boolean => {
    const pos = editor.selection?.anchor || editor.selection?.focus;
    if (!pos) return false;

    return pos.path.length <= 2;
};

/**
 * Returns whether the current node is the root node.
 *
 * @param node
 */
const isRoot = (node: Node): boolean => {
    const leaf = node as CustomText;
    const element = node as CustomElement;

    // assuming that if no text and type is available, it is the root node
    if (!leaf['text'] && !element['type']) {
        return true;
    }

    return false;
};

/**
 * Returns whether the current text node the users cursors is located in is empty or not.
 *
 * @param editor
 */
const isEmpty = (editor: CustomEditor): boolean => {
    if (isSelection(editor) || !editor.selection) {
        return false;
    }

    const leaf = currentLeaf(editor);
    if (!leaf) {
        return true;
    }

    return leaf.text === '';
};

/**
 * Creates a new paragraph at root level in the current cursors block.
 * If the block contains text from the cursor to the block end, this text will be added to the new
 * paragraph.
 *
 * @param editor
 */
const createRootParagraph = (editor: CustomEditor): void => {
    if (!editor.selection) {
        return;
    }

    createNewNodeOfCurrentType(editor);

    // set the type to paragraph
    changeCurrentNodeType(editor, 'paragraph');

    liftToRoot(editor);
};

/**
 * Creates a newline at the cursor position of the editor.
 *
 * @param editor
 */
const createNewline = (editor: CustomEditor): void => {
    Transforms.insertText(editor, '\n');
};

/**
 * Moves the node at the current editors selection to root level.
 *
 * @param editor
 */
const liftToRoot = (editor: CustomEditor): void => {
    while (!SlateUtils.isAtRoot(editor)) {
        Transforms.liftNodes(editor);
    }
};

/**
 * Sets the formatting of the leaf node at the specified range.
 * If range is not defined, the current editors selection will be used for the operation.
 *
 * @param editor
 * @param formatOptions
 * @param range
 */
const setLeafFormat = (
    editor: CustomEditor,
    formatOptions: { bold?: boolean; italic?: boolean },
    range?: { anchor: Point; focus: Point }
) => {
    if (!editor.selection) {
        return;
    }

    Transforms.setNodes(editor, formatOptions, {
        at: range ? range : editor.selection,
        match: (n) => Text.isText(n),
        split: true
    });
};

export const SlateUtils = {
    changeCurrentNodeType: changeCurrentNodeType,
    createNewNode: createNewNode,
    createNewNodeOfCurrentType: createNewNodeOfCurrentType,
    wrapNode: wrapNode,
    unwrapNode: unwrapNode,
    unwrapLeaf: unwrapLeaf,
    isCursor: isCursor,
    isSelection: isSelection,
    currentBlockStart: currentBlockStart,
    currentBlockEnd: currentBlockEnd,
    textSinceBlockStart: textSinceBlockStart,
    textToBlockEnd: textToBlockEnd,
    lastPosOf: lastPosOf,
    cursorIsBehind: cursorIsBehind,
    currentBlockText: currentBlockText,
    setCurrentBlockText: setCurrentBlockText,
    deleteFromLeft: deleteFromLeft,
    deleteFromRight: deleteFromRight,
    deleteAt: deleteAt,
    isChildOf: isChildOf,
    currentElement: currentElement,
    currentElementType: currentElementType,
    currentElementPath: currentElementPath,
    parentElement: parentElement,
    parentElementType: parentElementType,
    currentLeaf: currentLeaf,
    isElement: isElement,
    isLeaf: isLeaf,
    isRoot: isRoot,
    isEmpty: isEmpty,
    isAtRoot: isAtRoot,
    createRootParagraph: createRootParagraph,
    createNewline: createNewline,
    liftToRoot: liftToRoot,
    setLeafFormat: setLeafFormat
};
