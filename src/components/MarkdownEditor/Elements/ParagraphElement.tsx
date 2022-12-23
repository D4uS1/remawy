import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the ParagraphElement component.
 */
type ParagraphElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a paragraph element.
 *
 * @param props
 * @constructor
 */
export const ParagraphElement = (props: ParagraphElementProps) => {
    return <p {...props.attributes}>{props.children}</p>;
};
