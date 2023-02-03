import React, { useCallback, useState, KeyboardEvent } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';
import { CodeElement } from './Elements/CodeElement';
import { ParagraphElement } from './Elements/ParagraphElement';
import { CustomElement, CustomElementType } from './Types/CustomElement';
import { CustomText } from './Types/CustomText';
import { CustomEditor } from './Types/CustomEditor';
import { BlockquoteElement } from './Elements/BlockquoteElement';
import { Heading1Element } from './Elements/Heading1Element';
import { Heading2Element } from './Elements/Heading2Element';
import { Heading3Element } from './Elements/Heading3Element';
import { Heading4Element } from './Elements/Heading4Element';
import { Heading5Element } from './Elements/Heading5Element';
import { Heading6Element } from './Elements/Heading6Element';
import { OrderedListElement } from './Elements/OrderedListElement';
import { UnorderedListElement } from './Elements/UnorderedListElement';
import { ListItemElement } from './Elements/ListItemElement';
import { SlateUtils } from './Utils/SlateUtils';
import { CustomLeafProps, CustomLeaf } from './Leafs/CustomLeaf';
import { CustomLeafHelper } from './Helpers/CustomLeafHelper';
import { Toolbar } from './Toolbar/Toolbar';
import { Helpers } from './Helpers/Helpers';
import styles from './MarkdownEditor.module.css';

/**
 * Extend the CustomTypes in the slate module to tell slate what custom elements we have.
 */
declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
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

    // Optional class name that is passed to the container.
    className?: string;

    // Optional css class name that is passed to the toolbar container
    toolbarClassName?: string;

    // Optional css class name that is passed to the toolbar buttons
    toolbarButtonClassName?: string;

    // Optional css class name that is passed to the editor container
    editorClassName?: string;
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
    const [editor] = useState(() => withReact(createEditor()));

    /**
     * Returns the name of the custom element behind a markdown shortcut.
     * If no shortcut can be found, null will be returned.
     */
    const typeByShortcut = useCallback((shortcut: string): CustomElementType | null => {
        switch (shortcut) {
            case '#': {
                return 'heading-1';
            }

            case '##': {
                return 'heading-2';
            }

            case '###': {
                return 'heading-3';
            }

            case '####': {
                return 'heading-4';
            }

            case '#####': {
                return 'heading-5';
            }

            case '######': {
                return 'heading-6';
            }

            case '>': {
                return 'blockquote';
            }

            case '```': {
                return 'code';
            }

            case '*': {
                return 'list-item';
            }

            default: {
                // for ordered lists: 1. 2. ...
                if (/^\d+\.$/.test(shortcut)) {
                    return 'list-item';
                }
            }
        }

        return null;
    }, []);

    /**
     * Defines all custom renderers for elements, based on its element type given by the props.
     */
    const renderElement = useCallback((props: RenderElementProps) => {
        console.log("Komme in die render shitte rein", props)
        console.log("type", props.element.type);
        switch (props.element.type) {
            case 'blockquote':
                return <BlockquoteElement {...props} />;
            case 'code':
                return <CodeElement {...props} />;
            case 'heading-1':
                console.log("Komme in die render heading rein")
                return <Heading1Element {...props} />;
            case 'heading-2':
                return <Heading2Element {...props} />;
            case 'heading-3':
                return <Heading3Element {...props} />;
            case 'heading-4':
                return <Heading4Element {...props} />;
            case 'heading-5':
                return <Heading5Element {...props} />;
            case 'heading-6':
                return <Heading6Element {...props} />;
            case 'list-item':
                return <ListItemElement {...props} />;
            case 'ordered-list':
                return <OrderedListElement {...props} />;
            case 'unordered-list':
                return <UnorderedListElement {...props} />;
            default:
                console.log("Komme in die render default rein")
                return <ParagraphElement {...props} />;
        }
    }, []);

    /**
     * Defines a custom renderer for leafes slate creates.
     * Leaves are part of text that can contain custom styles.
     * Usually this is not needed in case of markdown, but it is added for completition here.
     */
    const renderLeaf = useCallback((props: CustomLeafProps) => {
        return <CustomLeaf {...props} />;
    }, []);

    /**
     * Called if the user typed something into the editor.
     * Catches the inputs to transform them to the corresponding custom rendered elements.
     *
     * @param event
     */
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            // Format based components, handled as leafes
            case '_':
            case '*': {
                CustomLeafHelper.handleBoldAndItalic(editor, event);

                break;
            }

            // Shortcut based components for space, Dead key is a special case for `,
            // because javascript can not handle this key, because HUEHUEHUEHUEHUEHUEHUEHUEHUEHUE
            case ' ':
            case 'Dead': {
                // We want to see if the text since block start is a markdown shortcut
                const shortcutText = SlateUtils.textSinceBlockStart(editor);
                if (!shortcutText) {
                    break;
                }

                // If the typed in characters define a shortcut, get it
                const shortcutType = typeByShortcut(shortcutText);
                if (!shortcutType) {
                    break;
                }

                // Render the corresponding markdown element
                Helpers[shortcutType].toggle(editor, { actor: 'shortcut', actorShortcut: shortcutText });

                // remove the shortcut text
                SlateUtils.deleteFromLeft(editor, shortcutText.length);

                // Prevent the newest key from being printed
                event.preventDefault();

                break;
            }

            // Some components like list actions react on a tab press.
            case 'Tab': {
                const currentBlockType = SlateUtils.currentElementType(editor);
                if (!currentBlockType) {
                    break;
                }

                const onTabFunc = Helpers[currentBlockType].onTab;
                if (!onTabFunc) {
                    break;
                }

                onTabFunc(editor, event);

                // prevent default is not called here, because the onTab handlers should be able to
                // decide whether the slate default action will be processed
                break;
            }

            // Normally pressing enter should create a new paragraph, but for some cases this should not be the case.
            // If some onEnter callback for the current block type exists, this will be handled instead of the default case
            case 'Enter': {
                const currentBlockType = SlateUtils.currentElementType(editor);
                if (!currentBlockType) {
                    break;
                }

                // onEnter exists on current type => call onEnter
                const onEnterFunc = Helpers[currentBlockType].onEnter;
                if (!onEnterFunc) {
                    break;
                }

                onEnterFunc(editor, event);

                // prevent default is not called here, because the onEnter handlers should be able to
                // decide whether the slate default action will be processed
                break;
            }
        }
    };

    /**
     * Called if the value of the slate component changes.
     * Generates the markdown and submits it via the callback given by the props, if the content
     * was changed and submitted.
     *
     * @param value
     */
    const onSlateChange = (value: Descendant[]) => {
        const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type);

        if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            console.log('Change', content);
        }
    };

    return (
        <Slate
            editor={editor}
            value={[
                {
                    type: 'paragraph',
                    children: [{ text: 'A line of text in a paragraph.' }]
                }
            ]}
            onChange={onSlateChange}
        >
            <div className={`${styles.container} ${props.className || ''}`}>
                <Toolbar className={props.toolbarClassName} buttonClassName={props.toolbarButtonClassName} />

                <Editable
                    className={props.editorClassName}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={onKeyDown}
                />
            </div>
        </Slate>
    );
};
