import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the Heading1Element component.
 */
type HyperLinkElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a heading of size 1.
 *
 * @param props
 * @constructor
 */
export const HyperLinkElement = (props: HyperLinkElementProps) => {
    return (
        <a href={props.element.href} {...props.attributes}>
            {props.children}
        </a>
    );
};
