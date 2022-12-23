import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the Heading1Element component.
 */
type Heading6ElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a heading of size 6.
 *
 * @param props
 * @constructor
 */
export const Heading6Element = (props: Heading6ElementProps) => {
    return <h6 {...props.attributes}>{props.children}</h6>;
};
