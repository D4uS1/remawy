import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";
import {HelperUtils} from "../Utils/HelperUtils";

/**
 * Returns whether the BlockQuoteElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'blockquote');
}

/**
 * Toggles the rendering of the BlockQuoteElement in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.defaultToggle(editor, 'blockquote');
}

export const BlockquoteHelper: CustomHelper = {
    active: active,
    toggle: toggle
}