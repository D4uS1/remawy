import { Descendant } from 'slate';

/**
 * Describes the available definable elements in our editor.
 */
export type CustomElementType =
    | 'blockquote'
    | 'code'
    | 'heading-1'
    | 'heading-2'
    | 'heading-3'
    | 'heading-4'
    | 'heading-5'
    | 'heading-6'
    | 'hyperlink'
    | 'image'
    | 'ordered-list'
    | 'ordered-list-item'
    | 'paragraph'
    | 'unordered-list'
    | 'unordered-list-item';

/**
 * Defines one definition of an element in our editor.
 */
export type CustomElement = {
    type: CustomElementType;
    children?: Descendant[];

    // used by image
    src?: string;

    // used by image
    altText?: string;

    // used by hyperlink
    href?: string;

    // used by image and hyperlink
    metaData?: Record<string, string>;
};
