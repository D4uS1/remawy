import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Point, Text, Transforms} from "slate";
import {SlateUtils} from "../Utils/SlateUtils";
import { KeyboardEvent } from 'react';

/**
 * Returns whether the text at the editors selection is bold.
 *
 * @param editor
 */
const isBoldActive = (editor: CustomEditor): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n => Text.isText(n) && n.bold === true
    })

    return !!match
}

/**
 * Returns whether the text at the editors selection is italic.
 *
 * @param editor
 */
const isItalicActive = (editor: CustomEditor): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n => Text.isText(n) && n.italic === true
    })

    return !!match
}

/**
 * Sets the text at the editors selection to bold.
 * If range is given, the text in the specified range will be set to bold.
 * Otherwise the text in the editors selection will be set to bold.
 *
 * @param editor
 * @param range
 */
const setBold = (editor: CustomEditor, range?: { anchor: Point, focus: Point }) => {
    if (!editor.selection) { return }

    Transforms.setNodes(editor, { bold: true }, {
        at: range ? range : editor.selection,
        match: (n) => Text.isText(n),
        split: true
    })
}

/**
 * Removes the bold rendering from the editors current cursor.
 *
 * @param editor
 */
const unsetBold = (editor: CustomEditor) => {
    Transforms.setNodes(
        editor,
        { bold: undefined },
        { match: n => Text.isText(n), split: true }
    )
}

/**
 * Sets the text at the editors selection to italic.
 * If range is given, the text in the specified range will be set to italic.
 * Otherwise the text in the editors selection will be set to italic.
 *
 * @param editor
 * @param range
 */
const setItalic = (editor: CustomEditor, range?: { anchor: Point, focus: Point }) => {
    if (!editor.selection) { return }

    Transforms.setNodes(editor, { italic: true }, {
        at: range ? range : editor.selection,
        match: (n) => Text.isText(n),
        split: true
    })
}

/**
 * Removes the italic rendering from the editors current cursor.
 *
 * @param editor
 */
const unsetItalic = (editor: CustomEditor) => {
    Transforms.setNodes(
        editor,
        { italic: undefined },
        { match: n => Text.isText(n), split: true }
    )
}

/**
 * Toggles the text at the editors selection to be bold or not, depending on whether
 * bold is currently active or not. Note that this method does not use setBold and unsetBold,
 * it sets marks to the editor because this is the method that should be used by the toolbar.
 *
 * @param editor
 */
const toggleBold = (editor: CustomEditor) => {
    if (isBoldActive(editor)) {
        Editor.removeMark(editor, 'bold');
    } else {
        Editor.addMark(editor, 'bold', true);
    }
}

/**
 * Toggles the text at the editors selection to be italic or not, depending on whether
 * italic is currently active or not. Note that this method does not use setItalic and unsetItalic,
 * it sets marks to the editor because this is the method that should be used by the toolbar.
 *
 * @param editor
 */
const toggleItalic = (editor: CustomEditor) => {
    if (isItalicActive(editor)) {
        Editor.removeMark(editor, 'italic');
    } else {
        Editor.addMark(editor, 'italic', true);
    }
}

/**
 * Handles the bold or italic state at the editors cursor if the user typed a * or _.
 * If the user typed ** or __ and some previous ** or __ exists, the text will be set to bold.
 * If the user typed * or _ and some previous * or _ exists, the text will be set to italic.
 *
 * @param editor
 * @param event
 */
const handleBoldAndItalic = (editor: Editor, event: KeyboardEvent<HTMLDivElement>) => {
    if (!['_', '*'].includes(event.key)) { return }

    // If the cursor is behind a _ the user typed __, hence he wants to have bold text
    if (SlateUtils.cursorIsBehind(editor, event.key)) {
        // Find the beginning position of the text that should be bold
        const lastPos = SlateUtils.lastPosOf(editor, `${event.key}${event.key}`)
        if (!lastPos || !editor.selection) { return }

        setBold(editor, { anchor: lastPos, focus: editor.selection.anchor });

        // This forces the editor at the cursors position to not write bold further
        Editor.addMark(editor, 'bold', false)

        // Remove shortcuts
        SlateUtils.deleteAt(editor, lastPos, 2)
        SlateUtils.deleteFromRight(editor, 1);
        SlateUtils.deleteAt(editor, editor.selection.anchor, 1);
        event.preventDefault();
    } else {
        // Find the beginning position of the text that should be italic
        const lastPos = SlateUtils.lastPosOf(editor, event.key, { isolated: true })
        if (!lastPos || !editor.selection) { return }

        setItalic(editor, { anchor: lastPos, focus: editor.selection.anchor });

        // This forces the editor at the cursors position to not write italic further
        Editor.addMark(editor, 'italic', false)

        // Remove shortcuts
        SlateUtils.deleteAt(editor, lastPos, 1)
        event.preventDefault();
    }

    // This is a hack to reset the format at the cursor position.
}

export const CustomLeafHelper = {
    isBoldActive: isBoldActive,
    isItalicActive: isItalicActive,
    toggleBold: toggleBold,
    toggleItalic: toggleItalic,
    setBold: setBold,
    setItalic: setItalic,
    unsetBold: unsetBold,
    unsetItalic: unsetItalic,
    handleBoldAndItalic: handleBoldAndItalic,
}