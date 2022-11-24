import React from 'react'
import {RenderElementProps} from "slate-react";

/**
 * Props for the BoldElement component.
 */
interface BoldElementProps extends RenderElementProps { }

/**
 * A Custom element for Slate for rendering a bold text surrounded by a strong tag.
 *
 * @param props
 * @constructor
 */
export const BoldElement = (props: BoldElementProps) => {
    return (
        <strong {...props.attributes}>{props.children}</strong>
    )
}