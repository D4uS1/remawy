import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Point, Text} from "slate";

/**
 * Returns whether the editors selection is a cursor, meaining the user did not select any text,
 * but is located somewhere in the editor.
 *
 * @param editor
 */
const isCursor = (editor: CustomEditor): boolean => {
    if (!editor.selection) { return false };

    return Point.equals(editor.selection.anchor, editor.selection.focus);
}

/**
 * Returns whether the user selected some text.
 *
 * @param editor
 */
const isSelection = (editor: CustomEditor): boolean => {
    if (!editor.selection) { return false };

    return !isCursor(editor);
}

/**
 * Returns the text from the start of the block of the current cursor in the specified slate editor.
 * Returns null if the text could not be found.
 *
 * @param editor
 */
const textSinceBlockStart = (editor: CustomEditor): string | null => {
    if (!editor.selection || !isCursor(editor)) { return null }

    // Get the nearest block from the selection
    const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
    })

    // The path to the block is located in the second item of the result
    const path = block ? block[1] : []

    // Find the start point of the block
    const start = Editor.start(editor, path)

    // Build a range object from the current selection to the start point
    const range = { anchor: editor.selection.anchor, focus: start }

    // extract the text from the range
    return Editor.string(editor, range);
}

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
    if (!editor.selection || !isCursor(editor)) { return null }

    const path = editor.selection.anchor.path;

    // Select the text between start of the block and the current cursor position
    const blockText = Editor.string(editor, {
        anchor: { path: path, offset: 0},
        focus: editor.selection.anchor
    });

    // Find last occurence of search text
    let lastIndex = blockText.lastIndexOf(searchText);

    // If the isolated option is set to true, the searchText must not beside searchText
    if (options?.isolated) {
        if (blockText.substring(lastIndex + searchText.length, lastIndex + searchText.length * 2) === searchText) {
            return null;
        }

        if (blockText.substring(lastIndex - searchText.length, lastIndex) === searchText) {
            return null;
        }
    }

    if (lastIndex === -1) { return null }

    return {
        path: path,
        offset: lastIndex
    };
}

/**
 * Returns whether the current cursor is behind the specified searchText, meaninig that the searchText is
 * left beside the cursor.
 * If the user has currently selected text, false will be returned.
 *
 * @param editor
 * @param searchText
 */
const cursorIsBehind = (editor: CustomEditor, searchText: string): boolean => {
    if (!editor.selection || !isCursor(editor)) { return false }

    return !!textSinceBlockStart(editor)?.endsWith(searchText);
}


export const SlateUtils = {
    textSinceBlockStart: textSinceBlockStart,
    lastPosOf: lastPosOf,
    isCursor: isCursor,
    isSelection: isSelection,
    cursorIsBehind: cursorIsBehind
}