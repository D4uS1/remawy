import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";
import {KeyboardEvent} from 'react';
import {SlateUtils} from "../Utils/SlateUtils";
import {HelperUtils} from "../Utils/HelperUtils";

/**
 * Returns whether the ParagraphElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'paragraph');
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
 * Overwrites the behavior of the editor on pressing enter in a paragraph element.
 * If the user presses shift and enter, a new line will be created.
 * If the user only presses enter, a new empty paragraph will be created.
 *
 * @param editor
 * @param event
 */
const onEnter = (editor: CustomEditor, event: KeyboardEvent) => {
    HelperUtils.onEnterWithShiftLinebreak(editor, event)
}

export const ParagraphHelper: CustomHelper = {
    active: active,
    toggle: toggle,
    onEnter: onEnter
}