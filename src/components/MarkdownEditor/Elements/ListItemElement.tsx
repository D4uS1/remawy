import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the UnorderedListElement component.
 */
type ListItemElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a list item in an unordered or ordered list.
 *
 * @param props
 * @constructor
 */
export const ListItemElement = (props: ListItemElementProps) => {
    return <li {...props.attributes}>{props.children}</li>;
};
