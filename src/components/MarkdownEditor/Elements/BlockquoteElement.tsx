import React from 'react'
import {RenderElementProps} from "slate-react";

/**
 * Props for the CodeElement component.
 */
interface BlockquoteElementProps extends RenderElementProps { }

/**
 * A Custom element for Slate for rendering a cite block.
 *
 * @param props
 * @constructor
 */
export const BlockquoteElement = (props: BlockquoteElementProps) => {
    return (
        <blockquote {...props.attributes}>
          {props.children}
        </blockquote>
    )
}