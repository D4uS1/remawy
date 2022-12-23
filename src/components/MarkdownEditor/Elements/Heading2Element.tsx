import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the Heading1Element component.
 */
type Heading2ElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a heading of size 2.
 *
 * @param props
 * @constructor
 */
export const Heading2Element = (props: Heading2ElementProps) => {
    return <h2 {...props.attributes}>{props.children}</h2>;
};
