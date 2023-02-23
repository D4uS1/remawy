import { CustomElement, CustomElementType } from '../Types/CustomElement';
import { Descendant, Editor, Element } from 'slate';
import { CustomEditor } from '../Types/CustomEditor';
import { SlateUtils } from './SlateUtils';
import { KeyboardEvent } from 'react';
import { ToggleOptions } from '../Types/CustomHelper';

/**
 * Can be used by helpers to check whether the element of the specified elementType is
 * currently active in the current block of the editors cursor.
 *
 * @param editor
 * @param elementType
 */
const defaultIsActive = (editor: CustomEditor, elementType: CustomElementType): boolean => {
    const [match] = Editor.nodes(editor, {
        match: (n) => (n as Element).type === elementType
    });

    return !!match;
};

/**
 * Can be used by helpers to toggle the element at the editors current cursor between the
 * specified elementType and default paragraph.
 *
 * @param editor
 * @param elementType
 */
const defaultToggle = (editor: CustomEditor, elementType: CustomElementType): void => {
    const isActive = defaultIsActive(editor, elementType);

    if (isActive) {
        SlateUtils.changeCurrentNodeType(editor, 'paragraph');
    } else {
        SlateUtils.changeCurrentNodeType(editor, elementType);
    }
};

/**
 * Can be used by helpers to toggle the element at the editors current cursor between the
 * specified elementType and default paragraph.
 * The element is expected to be only allowed at the root, meaing the element must not be in a list or
 * some other element.
 *
 * @param editor
 * @param elementType
 */
const toggleAtRoot = (editor: CustomEditor, elementType: CustomElementType): void => {
    const isActive = defaultIsActive(editor, elementType);

    // Not active, first get to root and then set element
    if (!isActive) {
        SlateUtils.liftToRoot(editor);

        return SlateUtils.changeCurrentNodeType(editor, elementType);
    }

    // Active should be only in root, hence we can deactivate it by setting only to paragraph
    SlateUtils.changeCurrentNodeType(editor, 'paragraph');
};

/**
 * Can be used by helpers to toggle nodes of elementType inline.
 * The node is converted to a leaf if it is currently active, if possible.
 * Otherwise the current node tyoe is set to elementType.
 * The props are merged with the node types props if the node type is activated.
 * If defaultChildren is given, the children will be passed if the user did not select some text.
 *
 * @param editor
 * @param elementType
 * @param props
 * @param defaultChildren
 */
const toggleInlineNode = (
    editor: CustomEditor,
    elementType: CustomElementType,
    props?: Partial<CustomElement>,
    defaultChildren?: Descendant[]
): void => {
    const isActive = defaultIsActive(editor, elementType);

    if (isActive) {
        SlateUtils.removeInlineNode(editor);
    } else {
        const defaultProps =
            defaultChildren && SlateUtils.isCursor(editor) ? { ...props, children: defaultChildren } : props;

        SlateUtils.changeCurrentNodeType(editor, elementType, defaultProps);
    }
};

/**
 * Can be used by helpers to toggle the element at the editors current cursor between the
 * specified elementType and default paragraph.
 * The element is expected to be allowed in list items, meaning that lists can be used to eg. indent the element.
 *
 * @param editor
 * @param elementType
 */
const toggleWithListAllowed = (editor: CustomEditor, elementType: CustomElementType) => {
    const isActive = defaultIsActive(editor, elementType);
    const isInOrderedList = SlateUtils.isChildOf(editor, 'ordered-list-item');
    const isInUnorderedList = SlateUtils.isChildOf(editor, 'unordered-list-item');
    const isInList = isInOrderedList || isInUnorderedList;

    if (isActive && isInList) {
        return SlateUtils.unwrapLeaf(editor);
    } else if (isActive && !isInList) {
        return SlateUtils.changeCurrentNodeType(editor, 'paragraph');
    }

    SlateUtils.changeCurrentNodeType(editor, elementType);

    if (!isInList) return;

    SlateUtils.wrapNode(editor, isInOrderedList ? 'ordered-list-item' : 'unordered-list-item');
};

/**
 * Can be used by helpers in onEnter callbacks to create a newline in the current block if the
 * user pressed shift and enter at once. If the user did not press shift, a new paragraph at
 * root level will be created.
 *
 * @param editor
 * @param event
 */
const onEnterWithShiftLinebreak = (editor: CustomEditor, event: KeyboardEvent) => {
    if (event.shiftKey) {
        SlateUtils.createNewline(editor);
    } else {
        SlateUtils.createRootParagraph(editor);
    }

    event.preventDefault();
};

/**
 * Can be used by helpers in onEnter callbacks for elements that are allowed to be in lists.
 * If the element is in a list, the element will be unwrapped to disable it for the next list item.
 * If the element is not in a list, the default onEnter action will be executed that allows pressing shift
 * for only newline.
 *
 * @param editor
 * @param event
 */
const onEnterWithListAndNewlineAllowed = (editor: CustomEditor, event: KeyboardEvent) => {
    const isInOrderedList = SlateUtils.isChildOf(editor, 'ordered-list-item');
    const isInUnorderedList = SlateUtils.isChildOf(editor, 'unordered-list-item');
    const isInList = isInOrderedList || isInUnorderedList;

    // If the item is not in a list, do the default behavior
    // If shiftKey is pressed we just want to have a newline, that is also handled in the default function
    if (!isInList || event.shiftKey) {
        return onEnterWithShiftLinebreak(editor, event);
    }

    // If the node is in a list and shift is not pressed
    if (isInList) {
        SlateUtils.createNewNodeOfCurrentType(editor);

        SlateUtils.changeCurrentNodeType(editor, isInOrderedList ? 'ordered-list-item' : 'unordered-list-item');

        return event.preventDefault();
    }

    onEnterWithShiftLinebreak(editor, event);
};

/**
 * Deactivates the list item at the cursor position of the editor, by setting it to paragraph
 * and removing all indents.
 *
 * @param editor
 * @param listType
 */
const deactivateListItem = (editor: CustomEditor, listType: 'ordered-list' | 'unordered-list') => {
    // Remove lists and indented lists until we are in the "root"
    do {
        SlateUtils.unwrapNode(editor);
    } while (SlateUtils.parentBlockType(editor) === listType);

    // Change the list-item element to paragraph
    SlateUtils.changeCurrentNodeType(editor, 'paragraph');
};

/**
 * Toggles the rendering of the ListItemElement in the specified editor in a list of the specified listType.
 *
 * @param editor
 * @param listType
 * @param options
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toggleListItem = (editor: CustomEditor, listType: 'ordered-list' | 'unordered-list', options?: ToggleOptions) => {
    const listItemType = listType === 'ordered-list' ? 'ordered-list-item' : 'unordered-list-item';

    // currently we are in a list item, hence we need to deactivate it.
    if (defaultIsActive(editor, listItemType)) {
        return deactivateListItem(editor, listType);
    }

    if (!SlateUtils.isChildOf(editor, listType)) {
        SlateUtils.wrapNode(editor, listType);
    }

    SlateUtils.changeCurrentNodeType(editor, listItemType);
};

/**
 * Called if the user presses tab in a list-item element of the specified listType.
 * Forces the list to get into a sub list, to enable indent behavior.
 *
 * @param editor
 * @param listType
 * @param event
 */
const onTabListItem = (editor: CustomEditor, listType: 'ordered-list' | 'unordered-list', event: KeyboardEvent) => {
    // if shift is pressed, the list current list should be unintended
    if (event.shiftKey) {
        SlateUtils.unwrapNode(editor);

        // If the parent is no list (after lifting), convert it to paragraph
        // If the parentElement is null, it is assumed that the parent element is the root node, hence
        // we want to convert it back here, too
        const parentBlock = SlateUtils.parentBlock(editor);
        if (!parentBlock || parentBlock.type !== listType) {
            SlateUtils.changeCurrentNodeType(editor, 'paragraph');
        }

        // if shift is not pressed, the list should be intended
    } else {
        const parentBlock = SlateUtils.parentBlock(editor);
        const currentBlock = SlateUtils.currentBlock(editor);
        if (!currentBlock || !parentBlock) return;

        SlateUtils.wrapNode(editor, listType);
    }

    // prevent default tab handler from being processed
    event.preventDefault();
};

/**
 * Overwrites the default behavior if the user presses enter in a list item in the specified listType.
 * If the curent textnode is empty, a new paragraph will be created. This should be the case if the user
 * is inside an empty list-entry.
 * Otherwise a new list entry will be created. This is done by just doing nothing, because this shoul cause slate
 * to do its default action that is creating a new list-entry.
 *
 * @param editor
 * @param listType
 * @param event
 */
const onEnterListItem = (editor: CustomEditor, listType: 'ordered-list' | 'unordered-list', event: KeyboardEvent) => {
    // only remove list item it enter was pressed twice
    const textSinceBlockStart = SlateUtils.textSinceBlockStart(editor);
    if (textSinceBlockStart !== '') return;

    deactivateListItem(editor, listType);

    // Prevent default slate action
    event.preventDefault();
};

export const HelperUtils = {
    defaultIsActive: defaultIsActive,
    defaultToggle: defaultToggle,
    toggleInlineNode: toggleInlineNode,
    toggleAtRoot: toggleAtRoot,
    toggleWithListAllowed: toggleWithListAllowed,
    onEnterWithShiftLinebreak: onEnterWithShiftLinebreak,
    onEnterWithListAndNewlineAllowed: onEnterWithListAndNewlineAllowed,
    toggleListItem: toggleListItem,
    onTabListItem: onTabListItem,
    onEnterListItem: onEnterListItem
};
