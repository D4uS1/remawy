import React, { useMemo } from 'react';
import { EditorValue } from '../MarkdownEditor/MarkdownEditor';
import { toMarkdown } from '../../shared/serializers/EditorValueMarkdownSerializer';

/**
 * Props for the Editor component.
 */
export interface MarkdownViewProps {
    // The editor value that serialized markdown should be shown
    value: EditorValue;
}

/**
 * A view to show the markdown given by the props, having the same style like the ReMaWy Editor.
 *
 * @param props
 * @constructor
 */
export const MarkdownView = (props: MarkdownViewProps) => {
    const markdown = useMemo(() => {
        return toMarkdown(props.value);
    }, [props.value]);

    return <div>{markdown}</div>;
};
