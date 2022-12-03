import React, {useCallback, useState, KeyboardEvent, CompositionEvent, useMemo} from 'react'
import {createEditor, Editor, Transforms, Descendant, Text, Node} from 'slate'
import {Slate, Editable, withReact, RenderElementProps, RenderLeafProps} from 'slate-react'
import {CodeElement} from "./Elements/CodeElement";
import {ParagraphElement} from "./Elements/ParagraphElement";
import {CustomElement, CustomElementName} from "./Types/CustomElement";
import {CustomText} from "./Types/CustomText";
import {CustomEditor} from "./Types/CustomEditor";
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
import {Heading2Helper} from "./Helpers/Heading2Helper";
import {Heading3Helper} from "./Helpers/Heading3Helper";
import {Heading4Helper} from "./Helpers/Heading4Helper";
import {Heading5Helper} from "./Helpers/Heading5Helper";
import {Heading6Helper} from "./Helpers/Heading6Helper";
import {Heading1Helper} from "./Helpers/Heading1Helper";
import {BlockquoteHelper} from "./Helpers/BlockquoteHelper";
import {CodeHelper} from "./Helpers/CodeHelper";
import {UnorderedListHelper} from "./Helpers/UnorderedListHelper";
import {SlateUtils} from "./Utils/SlateUtils";
import {CustomHelper} from "./Types/CustomHelper";
import {ListItemHelper} from "./Helpers/ListItemHelper";
import {OrderedListHelper} from "./Helpers/OrderedListHelper";
import {ParagraphHelper} from "./Helpers/ParagraphHelper";
import {CustomLeafProps, CustomLeaf} from "./Leafs/CustomLeaf";
import {CustomLeafHelper} from "./Helpers/CustomLeafHelper";


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

    /**
     * Returns the name of the custom element behind a markdown shortcut.
     * If no shortcut can be found, null will be returned.
     */
    const typeByShortcut = useCallback((shortcut: string): CustomElementName | null => {
        switch (shortcut) {
            case '#': { return 'heading-1' }
            case '##': { return 'heading-2' }
            case '###': { return 'heading-3' }
            case '####': { return 'heading-4' }
            case '#####': { return 'heading-5' }
            case '######': { return 'heading-6' }
            case '>': { return 'blockquote' }
            case '```': { return 'code' }
            case '*': { return 'list-item' }
            default: {
                // for ordered lists: 1. 2. ...
                if (/^\d+\.$/.test(shortcut)) {
                    return 'list-item';
                }
            }
        }

        return null;
    }, []);

    const TYPE_HELPER_MAP: Record<CustomElementName, CustomHelper> = useMemo(() => {
        return {
            'blockquote': BlockquoteHelper,
            'code':  CodeHelper,
            'heading-1': Heading1Helper,
            'heading-2': Heading2Helper,
            'heading-3': Heading3Helper,
            'heading-4': Heading4Helper,
            'heading-5': Heading5Helper,
            'heading-6': Heading6Helper,
            'list-item': ListItemHelper,
            'ordered-list': OrderedListHelper,
            'paragraph': ParagraphHelper,
            'unordered-list': UnorderedListHelper,
        }
    }, [])

    /**
     * Defines all custom renderers for elements, based on its element type given by the props.
     */
    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case 'blockquote':
                return <BlockquoteElement {...props} />;
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
    const renderLeaf = useCallback((props: CustomLeafProps) => {
        return <CustomLeaf {...props} />
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
                const shortcutText = SlateUtils.textSinceBlockStart(editor)
                if (!shortcutText) { break; }

                // If the typed in characters define a shortcut, get it
                const shortcutType = typeByShortcut(shortcutText);
                if (!shortcutType) { break; }

                // Render the corresponding markdown element
                TYPE_HELPER_MAP[shortcutType].toggle(editor, { actor: "shortcut", actorShortcut: shortcutText })

                // remove the shortcut text
                SlateUtils.deleteFromLeft(editor, shortcutText.length);

                // Prevent the newest key from being printed
                event.preventDefault();

                break;
            }

            // Some components like list actions react on a tab press.
            case 'Tab': {
                const currentBlockType = SlateUtils.currentElementType(editor);
                if (!currentBlockType) { break; }

                const onTabFunc = TYPE_HELPER_MAP[currentBlockType].onTab
                if (!onTabFunc) { break; }

                onTabFunc(editor, event);

                // prevent default is not called here, because the onTab handlers should be able to
                // decide whether the slate default action will be processed
                break;
            }
            // Normally pressing enter should create a new paragraph, but for some cases this should not be the case.
            // If some onEnter callback for the current block type exists, this will be handled instead of the default case
            case 'Enter': {
                const currentBlockType = SlateUtils.currentElementType(editor);
                if (!currentBlockType) { break; }

                // onEnter exists on current type => call onEnter
                const onEnterFunc = TYPE_HELPER_MAP[currentBlockType].onEnter
                if (onEnterFunc) {
                    onEnterFunc(editor, event);

                    // prevent default is not called here, because the onEnter handlers should be able to
                    // decide whether the slate default action will be processed
                    break;
                }

                // onEnter does not exist on current type => create paragraph
                SlateUtils.createNewParagraph(editor);

                // prevent default action of slate
                event.preventDefault();

                break;
            }
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
