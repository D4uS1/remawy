import { CustomEditor } from './CustomEditor';
import { KeyboardEvent } from 'react';
import { CustomElement, CustomElementType } from './CustomElement';
/**
 * Defines the toggle options that can be passed to the toggle function.
 */
export interface ToggleOptions {
    actor: 'toolbar' | 'shortcut';
    actorShortcut?: string;
    actorShortcutMatch?: RegExpMatchArray;
}
/**
 * Type for one function to toggle the rendering of an element.
 */
export type CustomHelperToggleFunc = (editor: CustomEditor, options?: ToggleOptions, props?: Partial<CustomElement>) => void;
/**
 * Defines a helper that is used to provide functionality related to custom Elements.
 * Each Element should have its corresponding Helper.
 * The helper eg. is able to toggle the rendering if an element inside an editor, or can check whether it is currently rendered.
 */
export interface CustomHelper {
    elementType: CustomElementType;
    isVoid: boolean;
    isInline: boolean;
    shortcutText?: string;
    shortcutRegex?: RegExp;
    active: (editor: CustomEditor) => boolean;
    toggle: CustomHelperToggleFunc;
    onTab?: (editor: CustomEditor, event: KeyboardEvent) => void;
    onEnter?: (editor: CustomEditor, event: KeyboardEvent) => void;
    onUpsert?: (editor: CustomEditor, props: Partial<CustomElement>) => void;
}
