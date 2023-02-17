import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the Heading1Element component.
 */
type HyperlinkElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a heading of size 1.
 *
 * @param props
 * @constructor
 */
export const HyperlinkElement = (props: HyperlinkElementProps) => {
    return (
        <a href={props.element.href} {...props.attributes}>
            {props.children}
        </a>
    );
};
