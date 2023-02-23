import React, { useMemo } from 'react';
import { EditorValue } from '../MarkdownEditor/MarkdownEditor';
import { toMarkdown } from '../../shared/serializers/EditorValueMarkdownSerializer';
import ReactMarkdown from 'react-markdown'


/**
 * Props for the Editor component.
 */
export interface MarkdownViewProps {
    // The markdown value as string or the editor value that is serialized to markdown
    value: EditorValue | string;
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

        const serializedMarkdown = toMarkdown(props.value);
        console.log("serializedMarkdown", serializedMarkdown);

        return serializedMarkdown;
    }, [props.value]);

    return <ReactMarkdown>{markdown}</ReactMarkdown>;
};
