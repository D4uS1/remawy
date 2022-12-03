import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";
import {HelperUtils} from "../Utils/HelperUtils";

/**
 * Returns whether the Heading4Element is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'heading-4');
}

/**
 * Toggles the rendering of the Heading4Element in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.defaultToggle(editor, 'heading-4');
}

export const Heading4Helper: CustomHelper = {
    active: active,
    toggle: toggle
}