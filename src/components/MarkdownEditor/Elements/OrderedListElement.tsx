import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the OrderedListElement component.
 */
type OrderedListElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering an ordered list.
 *
 * @param props
 * @constructor
 */
export const OrderedListElement = (props: OrderedListElementProps) => {
    return <ol {...props.attributes}>{props.children}</ol>;
};
