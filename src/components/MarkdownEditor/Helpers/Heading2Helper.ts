import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";
import {HelperUtils} from "../Utils/HelperUtils";

/**
 * Returns whether the Heading2Element is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'heading-2');
}

/**
 * Toggles the rendering of the Heading2Element in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.defaultToggle(editor, 'heading-2');
}

export const Heading2Helper: CustomHelper = {
    active: active,
    toggle: toggle
}