import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";
import {KeyboardEvent} from 'react';
import {SlateUtils} from "../Utils/SlateUtils";

/**
 * Returns whether the ParagraphElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n => (n as Element).type === 'paragraph',
    })

    return !!match;
}

/**
 * Toggles the rendering of the ParagraphElement in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    Transforms.setNodes(
        editor,
        { type: 'paragraph' },
        { match: n => Editor.isBlock(editor, n) }
    )
}

/**
 * Overwrites the behavior of the editor on pressing enter.
 * If the user presses shift and enter, a new line will be created.
 * If the user only presses enter, a new empty paragraph will be created.
 *
 * @param editor
 * @param event
 */
const onEnter = (editor: CustomEditor, event: KeyboardEvent) => {
    if (event.shiftKey) {
        SlateUtils.createNewline(editor)
    } else {
        SlateUtils.createNewParagraph(editor)
    }

    event.preventDefault();
}

export const ParagraphHelper: CustomHelper = {
    active: active,
    toggle: toggle,
    onEnter: onEnter
}