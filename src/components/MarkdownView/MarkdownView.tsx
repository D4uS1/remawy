import React, { useMemo } from 'react';
import { EditorValue } from '../MarkdownEditor/MarkdownEditor';
import { toMarkdown } from '../../shared/serializers/EditorValueMarkdownSerializer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import elementStyles from '../../shared/styles/elements.module.css';

/**
 * Props for the Editor component.
 */
export interface MarkdownViewProps {
    // The markdown value as string or the editor value that is serialized to markdown
    value: EditorValue | string;

    // Optional class name that is appended to the root container
    className?: string;
}

/**
 * A view to show the markdown given by the props, having the same style like the ReMaWy Editor.
 *
 * @param props
 * @constructor
 */
export const MarkdownView = (props: MarkdownViewProps) => {
    const markdown = useMemo(() => {
        if (typeof props.value === 'string') return props.value;

        return toMarkdown(props.value);
    }, [props.value]);

    return (
        <div className={`${elementStyles.container} ${props.className || ''}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
};
