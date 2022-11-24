import React from 'react'
import {RenderElementProps} from "slate-react";

/**
 * Props for the ItalicElement component.
 */
interface ItalicElementProps extends RenderElementProps { }

/**
 * A Custom element for Slate for rendering a bold text surrounded by a tag showing the text as italic text.
 *
 * @param props
 * @constructor
 */
export const ItalicElement = (props: ItalicElementProps) => {
    return (
        <em {...props.attributes}>{props.children}</em>
    )
}