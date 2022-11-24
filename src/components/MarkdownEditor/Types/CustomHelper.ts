import {CustomEditor} from "./CustomEditor";

/**
 * Defines a helper that is used to provide functionality related to Elements.
 * Each Element should have its corresponding Helper.
 * The helper eg. is able to toggle the rendering if an element inside an editor, or can check whether it is currently rendered.
 */
export interface CustomHelper {
    // Returns whether the element is active in the specified slate editor.
    // Being active means that the element is currently rendered in editor.
    active: (editor: CustomEditor) => boolean;

    // Toggles the activation of the element this helper belongs to.
    // Activating the element means that it is shown in the editor.
    toggle: (editor: CustomEditor) => void;
}