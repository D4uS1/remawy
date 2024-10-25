import React from 'react';
import { EditorValue } from '../MarkdownEditor/MarkdownEditor';
/**
 * Props for the Editor component.
 */
export interface MarkdownViewProps {
    value: EditorValue | string;
    className?: string;
}
/**
 * A view to show the markdown given by the props, having the same style like the ReMaWy Editor.
 *
 * @param props
 * @constructor
 */
export declare const MarkdownView: (props: MarkdownViewProps) => React.JSX.Element;
