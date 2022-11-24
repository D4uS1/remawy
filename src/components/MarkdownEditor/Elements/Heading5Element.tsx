import React from 'react'
import {RenderElementProps} from "slate-react";

/**
 * Props for the Heading1Element component.
 */
interface Heading5ElementProps extends RenderElementProps { }

/**
 * A Custom element for Slate for rendering a heading of size 5.
 *
 * @param props
 * @constructor
 */
export const Heading5Element = (props: Heading5ElementProps) => {
    return (
        <h5 {...props.attributes}>{props.children}</h5>
    )
}