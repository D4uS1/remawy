import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";
import {HelperUtils} from "../Utils/HelperUtils";

/**
 * Returns whether the CodeElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'code');
}

/**
 * Toggles the rendering of the CodeElement in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.defaultToggle(editor, 'code');
}

export const CodeHelper: CustomHelper = {
    active: active,
    toggle: toggle
}