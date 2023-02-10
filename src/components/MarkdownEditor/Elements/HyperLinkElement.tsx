import { RenderElementProps } from 'slate-react';
import React, { useMemo } from 'react';
import { ElementUtils } from '../Utils/ElementUtils';

/**
 * Props for the Heading1Element component.
 */
type HyperLinkElementProps = RenderElementProps & { href: string; metaData: Record<string, string> };

/**
 * A Custom element for Slate for rendering a heading of size 1.
 *
 * @param props
 * @constructor
 */
export const HyperLinkElement = (props: HyperLinkElementProps) => {
    /**
     * Converts the metadata given by the props to data-attribute tags, hence
     * the information is not lost and kept in dom.
     */
    const dataAttributes = useMemo(() => ElementUtils.toDataAttributes(props.metaData), [props.metaData]);

    return (
        <a href={props.href} {...dataAttributes} {...props.attributes}>
            {props.children}
        </a>
    );
};
