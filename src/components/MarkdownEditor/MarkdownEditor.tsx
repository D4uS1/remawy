import React, {useState} from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

/**
 * Props for the MarkdownEditor component.
 */
export interface MarkdownEditorProps {
    // The current markdown
    markdown: string;

    // Called if the Markdown content was changed and submitted
    onSubmit: (markdown: string) => void;
}

/**
 * A react markown wysiwyg editor.
 * The current markdown is given via the props. If the value was submitted by the useer, hence the editing
 * was finished, the onSubmit callback in the props will be called.
 *
 * @param props
 * @constructor
 */
export const MarkdownEditor = (props: MarkdownEditorProps) => {
    const [editor] = useState(() => withReact(createEditor()))

    // Render the Slate context.
    return (
        <Slate editor={editor} value={[ {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        }]}>
            <Editable />
        </Slate>
    );

};
