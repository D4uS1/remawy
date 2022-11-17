import React from 'react'

/**
 * Props for the Editor component.
 */
export interface MarkdownViewProps {
    // The markdown to show in the view
    markdown: string;
}

/**
 * A view to show the markdown given by the props, having the same style like the ReMaWy Editor.
 *
 * @param props
 * @constructor
 */
export const MarkdownView = (props: MarkdownViewProps) => {
    return <div>{ props.markdown }</div>;
};
