import { RenderElementProps } from 'slate-react';
import React, { useMemo } from 'react';
import { ElementUtils } from '../Utils/ElementUtils';

/**
 * Props for the Heading1Element component.
 */
type ImageElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a heading of size 1.
 *
 * @param props
 * @constructor
 */
export const ImageElement = (props: ImageElementProps) => {
    /**
     * Converts the metadata given by the props to data-attribute tags, hence
     * the information is not lost and kept in dom.
     */
    const dataAttributes = useMemo(
        () => ElementUtils.toDataAttributes(props.element.metaData),
        [props.element.metaData]
    );

    return <img src={props.element.src} {...dataAttributes} {...props.attributes} />;
};
