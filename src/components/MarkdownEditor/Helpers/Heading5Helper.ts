import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";
import {HelperUtils} from "../Utils/HelperUtils";

/**
 * Returns whether the Heading5Element is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'heading-5');
}

/**
 * Toggles the rendering of the Heading5Element in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.defaultToggle(editor, 'heading-5');
}

export const Heading5Helper: CustomHelper = {
    active: active,
    toggle: toggle
}