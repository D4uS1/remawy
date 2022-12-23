import React from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * Props for the CodeElement component.
 */
type CodeElementProps = RenderElementProps;

/**
 * A Custom element for Slate for rendering a code block.
 *
 * @param props
 * @constructor
 */
export const CodeElement = (props: CodeElementProps) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};
