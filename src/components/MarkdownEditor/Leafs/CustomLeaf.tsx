import React from 'react'
import {RenderLeafProps } from "slate-react";

/**
 * Props for the CustomLeaf component.
 */
export interface CustomLeafProps extends RenderLeafProps { }

/**
 * A Custom element for Slate for rendering a leaf that can be used to apply custom styles.
 *
 * @param props
 * @constructor
 */
export const CustomLeaf = (props: CustomLeafProps) => {
    let resultNode = <span {...props.attributes }>{ props.children }</span>;

    if (props.leaf.bold) {
        resultNode  = <strong>{ resultNode }</strong>;
    }

    if (props.leaf.italic) {
        resultNode  = <em>{ resultNode }</em>;
    }

    return resultNode;
}