import {CustomText} from "./CustomText";


/**
 * Describes the available definable elements in our editor.
 */
export type CustomElementName = 'blockquote' | 'code' | 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5' | 'heading-6' | 'list-item' | 'ordered-list' | 'paragraph' | 'unordered-list'


/**
 * Defines one definition of an element in our editor.
 */
export type CustomElement = { type: CustomElementName; children?: CustomText[] }
