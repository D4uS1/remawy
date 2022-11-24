import React, {useCallback, useState, KeyboardEvent, CompositionEvent} from 'react'
import {createEditor, Editor, Transforms, Element, Descendant} from 'slate'
import {Slate, Editable, withReact, RenderElementProps, RenderLeafProps} from 'slate-react'
import {CodeElement} from "./Elements/CodeElement";
import {ParagraphElement} from "./Elements/ParagraphElement";
import {CustomElement} from "./Types/CustomElement";
import {BoldElement} from "./Elements/BoldElement";
import {ItalicElement} from "./Elements/ItalicElement";
import {DefaultLeaf} from "./Leafs/DefaultLeaf";
import {CustomText} from "./Types/CustomText";
import {CustomEditor} from "./Types/CustomEditor";
import {ItalicHelper} from "./Helpers/ItalicHelper";
import {BlockquoteElement} from "./Elements/BlockquoteElement";
import {Heading1Element} from "./Elements/Heading1Element";
import {Heading2Element} from "./Elements/Heading2Element";
import {Heading3Element} from "./Elements/Heading3Element";
import {Heading4Element} from "./Elements/Heading4Element";
import {Heading5Element} from "./Elements/Heading5Element";
import {Heading6Element} from "./Elements/Heading6Element";
import {OrderedListElement} from "./Elements/OrderedListElement";
import {UnorderedListElement} from "./Elements/UnorderedListElement";
import {ListItemElement} from "./Elements/ListItemElement";
import {BoldHelper} from "./Helpers/BoldHelper";
import {Heading2Helper} from "./Helpers/Heading2Helper";
import {Heading3Helper} from "./Helpers/Heading3Helper";
import {Heading4Helper} from "./Helpers/Heading4Helper";
import {Heading5Helper} from "./Helpers/Heading5Helper";
import {Heading6Helper} from "./Helpers/Heading6Helper";
import {Heading1Helper} from "./Helpers/Heading1Helper";
import {BlockquoteHelper} from "./Helpers/BlockquoteHelper";
import {CodeHelper} from "./Helpers/CodeHelper";


/**
 * Extend the CustomTypes in the slate module to tell slate what custom elements we have.
 */
declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor
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
    const [keyTimesTrack, setKeyTimesTrack] = useState<{ key: string, times: number, timer: NodeJS.Timeout } | null>(null)

    const KEY_TIMES_THRESHOLD = 1000;

    /**
     * Returns whether the specified key was pressed n times in the last KEY_TIMES_THRESHOLD milliseconds.
     *
     * @param key
     * @param n
     */
    const keyPressedTimes = (key: string, n: number): boolean => {
        if (!keyTimesTrack) return false;
        if (keyTimesTrack.key !== key) return false;

        return keyTimesTrack.times === n;
     }

    /**
     * Resets the state that counts the number a key was pressed multiple times.
     */
    const resetKeyTimesTrack = () => {
        setKeyTimesTrack(null)
     }

    /**
     * Defines all custom renderers for elements, based on its element type given by the props.
     */
    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case 'blockquote':
                return <BlockquoteElement {...props} />;
            case 'bold':
                return <BoldElement {...props} />;
            case 'code':
                return <CodeElement {...props} />;
            case 'heading-1':
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
            case 'italic':
                return <ItalicElement {...props} />;
            case 'list-item':
                return <ListItemElement {...props} />;
            case 'ordered-list':
                return <OrderedListElement {...props} />;
            case 'unordered-list':
                return <UnorderedListElement {...props} />;
            default:
                return <ParagraphElement {...props} />;
        }
    }, []);

    /**
     * Defines a custom renderer for leafes slate creates.
     * Leaves are part of text that can contain custom styles.
     * Usually this is not needed in case of markdown, but it is added for completition here.
     */
    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <DefaultLeaf {...props} />
    }, []);

    /**
     * Called if the user typed something into the editor.
     * Catches the inputs to transform them to the corresponding custom rendered elements.
     *
     * @param event
     */
    const onKeyDown = (event: KeyboardEvent) => {
        // The removes the shortcut keys from the text if they are pressed
        if (['_', '#', '>', 'Dead', '*'].includes(event.key)) {
            event.preventDefault()
        }

        switch (event.key) {
            case '_': {
                // Key was pressed second time, hence use bold instead italic
                if (keyPressedTimes('_', 1)) {
                    BoldHelper.toggle(editor);
                } else {
                    ItalicHelper.toggle(editor);
                }
                break;
            }
            case '#': {
                // Key was pressed more than one time
                if (keyPressedTimes('#', 1)) {
                    Heading2Helper.toggle(editor);
                } else if (keyPressedTimes('#', 2)) {
                    Heading3Helper.toggle(editor);
                } else if (keyPressedTimes('#', 3)) {
                    Heading4Helper.toggle(editor);
                } else if (keyPressedTimes('#', 4)) {
                    Heading5Helper.toggle(editor);
                } else if (keyPressedTimes('#', 5)) {
                    Heading6Helper.toggle(editor);
                } else {
                    Heading1Helper.toggle(editor);
                }
            }
            case '>': {
                BlockquoteHelper.toggle(editor);
                break;
            }

            // The ` key can not be used because it is marked as Dead key. Because no other dead key is used for markdown shortcuts, this should work
            case 'Dead': {
                if (keyPressedTimes('Dead', 2)) {
                    CodeHelper.toggle(editor);
                }

                break;
            }
        }

        // Handle checking if a user pressed a key multiple times in a threshold
        if (!keyTimesTrack || keyTimesTrack.key !== event.key) {
            setKeyTimesTrack({ key: event.key, times: 1, timer: setTimeout(resetKeyTimesTrack, KEY_TIMES_THRESHOLD) })
        } else if (keyTimesTrack.key === event.key) {
            clearTimeout(keyTimesTrack.timer)
            setKeyTimesTrack({ key: event.key, times: keyTimesTrack.times + 1, timer: setTimeout(resetKeyTimesTrack, KEY_TIMES_THRESHOLD) })
        }
    }

    /**
     * Called if the value of the slate component changes.
     * Generates the markdown and submits it via the callback given by the props, if the content
     * was changed and submitted.
     *
     * @param value
     */
    const onSlateChange = (value: Descendant[]) => {
        const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
        )

        if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value)
            console.log('Change', content)
        }
    }

    return (
        <Slate editor={editor}
               value={[{
                    type: 'paragraph',
                    children: [{ text: 'A line of text in a paragraph.' }],
                }]}
               onChange={onSlateChange}
        >
            <div>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        ItalicHelper.toggle(editor)
                    }}
                >
                    Italic
                </button>
            </div>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={onKeyDown}
            />
        </Slate>
    );

};
