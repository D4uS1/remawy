import React from 'react'
import {RenderElementProps} from "slate-react";

/**
 * Props for the UnorderedListElement component.
 */
interface UnorderedListElementProps extends RenderElementProps { }

/**
 * A Custom element for Slate for rendering an unordered list.
 *
 * @param props
 * @constructor
 */
export const UnorderedListElement = (props: UnorderedListElementProps) => {
    return (
        <ul {...props.attributes}>{props.children}</ul>
    )
}