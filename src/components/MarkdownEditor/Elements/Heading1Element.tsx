import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the Heading1Element component.
 */
type Heading1ElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a heading of size 1.
 *
 * @param props
 * @constructor
 */
export const Heading1Element = (props: Heading1ElementProps) => {
    return <h1 {...props.attributes}>{props.children}</h1>;
};
