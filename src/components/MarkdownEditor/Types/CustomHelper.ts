import {CustomEditor} from "./CustomEditor";
import {KeyboardEvent} from 'react';

/**
 * Defines the toggle options that can be passed to the toggle function.
 */
export interface ToggleOptions {
    // The actor that called the toggle function
    actor: 'toolbar' | 'shortcut';

    // The shortcut text this toggle was called by, needed if actor is shortcut
    actorShortcut?: string;
}

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
    toggle: (editor: CustomEditor, options?: ToggleOptions) => void;

    // Called if the user presses tab inside the component to overwrite the default behavior
    // of the editor on pressing tab.
    // Note that the onTab method has to decide whether the preventDefault metho of the evet should be called.
    onTab?: (editor: CustomEditor, event: KeyboardEvent) => void;

    // Called if the user presses enter inside the component
    // This should only be handled if the components behavior on pressing enter should be
    // different than the default behavior, that is just adding a new paragraph.
    // Note that the onTab method has to decide whether the preventDefault metho of the evet should be called.
    onEnter?: (editor: CustomEditor, event: KeyboardEvent) => void;
}