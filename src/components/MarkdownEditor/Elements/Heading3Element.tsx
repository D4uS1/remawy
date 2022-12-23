import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the Heading1Element component.
 */
type Heading3ElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a heading of size 3.
 *
 * @param props
 * @constructor
 */
export const Heading3Element = (props: Heading3ElementProps) => {
    return <h3 {...props.attributes}>{props.children}</h3>;
};
