import React from 'react'
import {RenderLeafProps} from "slate-react";

/**
 * Props for the DefaultLeaf component.
 */
interface DefaultLeafProps extends RenderLeafProps { }

/**
 * A Custom element for Slate for rendering a leaf that can be used to apply custom styles.
 * This is normally not used by markdown, because markdown shortcuts translate into html components directly.
 * It is only added to recognize that slate makes us able to use it, and in some case we may want to do so.
 *
 * @param props
 * @constructor
 */
export const DefaultLeaf = (props: DefaultLeafProps) => {
    return (
        <span {...props.attributes}>{props.children}</span>
    )
}