import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the Heading1Element component.
 */
type ImageElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a heading of size 1.
 *
 * @param props
 * @constructor
 */
export const ImageElement = (props: ImageElementProps) => {
    return (
        <span contentEditable={false} {...props.attributes}>
            <img src={props.element.src} />
            {props.children}
        </span>
    );
};
