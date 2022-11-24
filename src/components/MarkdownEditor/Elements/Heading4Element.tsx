import React from 'react'
import {RenderElementProps} from "slate-react";

/**
 * Props for the Heading1Element component.
 */
interface Heading4ElementProps extends RenderElementProps { }

/**
 * A Custom element for Slate for rendering a heading of size 4.
 *
 * @param props
 * @constructor
 */
export const Heading4Element = (props: Heading4ElementProps) => {
    return (
        <h4 {...props.attributes}>{props.children}</h4>
    )
}