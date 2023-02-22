import { CustomEditor } from './CustomEditor';
import { KeyboardEvent } from 'react';
import { CustomElement, CustomElementType } from './CustomElement';

/**
 * Defines the toggle options that can be passed to the toggle function.
 */
export interface ToggleOptions {
    // The actor that called the toggle function
    actor: 'toolbar' | 'shortcut';

    // The shortcut text this toggle was called by. This is set if the shortcut was identified
    // Using the helpers shortcutText property. If the helper was identified via the helpers shortcutRegex property,
    // the actorShortcutMatch should be used.
    actorShortcut?: string;

    // The shortcut regex match this toggle was called by. This is set if the shortcut was identified
    // Using the helpers shortcutRegex property. If the helper was identified via the helpers shortcutText property,
    // the actorShortcut should be used.
    actorShortcutMatch?: RegExpMatchArray;
}

/**
 * Type for one function to toggle the rendering of an element.
 */
export type CustomHelperToggleFunc = (
    editor: CustomEditor,
    options?: ToggleOptions,
    props?: Partial<CustomElement>
) => void;

/**
 * Defines a helper that is used to provide functionality related to custom Elements.
 * Each Element should have its corresponding Helper.
 * The helper eg. is able to toggle the rendering if an element inside an editor, or can check whether it is currently rendered.
 */
export interface CustomHelper {
    // The element type this helper belongs to
    elementType: CustomElementType;

    // True if the element is a void node, meaning that rendering the element is not managed by slate.
    // This is eg. the case if some element should not have children, like images.
    isVoid: boolean;

    // True if the element is an inline node, meaning that the element is no block, hence can be inserted
    // between inline texts. This is eg. the case for hyperlinks.
    isInline: boolean;

    // Defines a text that indicates a markdown shortcut for this element.
    // If the user types this shortcutText into the editor, the element should be toggled.
    // For block elements (not inline) the shortcut must be at the beginning of the block.
    // For inline elements this property is unused, since no "surrounding" inline shortcut exists.
    shortcutText?: string;

    // Defines a regex that indicates a markdown shortcut for this element if the regex matches.
    // If the user types some text and the typed in text matches the specified shortcutRegex, the element should be toggle.
    // This is especially useful for inline elements.
    // For block elements the regex should match at the beginning of a string, since the regex is matched against the block text.
    shortcutRegex?: RegExp;

    // Returns whether the element is active in the specified slate editor.
    // Being active means that the element is currently rendered in editor at the current users selection.
    active: (editor: CustomEditor) => boolean;

    // Toggles the activation of the element this helper belongs to.
    // Activating the element means that it is shown in the editor.
    toggle: CustomHelperToggleFunc;

    // Called if the user presses tab inside the component to overwrite the default behavior
    // of the editor on pressing tab.
    // Note that the onTab method has to decide whether the preventDefault metho of the evet should be called.
    onTab?: (editor: CustomEditor, event: KeyboardEvent) => void;

    // Called if the user presses enter inside the component
    // This should only be handled if the components behavior on pressing enter should be
    // different than the default behavior, that is just adding a new paragraph.
    // Note that the onTab method has to decide whether the preventDefault metho of the evet should be called.
    onEnter?: (editor: CustomEditor, event: KeyboardEvent) => void;

    // Called if the element should be inserted to the current cursors position, or
    // should be updated at the current cursors position.
    // This is a special case for elements that have additional properties like hyperlinks.
    // This properties can be configured in some form and after submit, they must be upserted, but not toggled.
    onUpsert?: (editor: CustomEditor, props: Partial<CustomElement>) => void;
}
