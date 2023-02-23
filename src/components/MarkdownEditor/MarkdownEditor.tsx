import React, { useCallback, useState, KeyboardEvent } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, ReactEditor } from 'slate-react';
import { CodeElement } from './Elements/CodeElement';
import { ParagraphElement } from './Elements/ParagraphElement';
import { CustomElement } from './Types/CustomElement';
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
import { BlockHelpersArray, Helpers, InlineHelpersArray, VoidHelpersArray } from './Helpers/Helpers';
import styles from './MarkdownEditor.module.css';
import { UploadModal } from './UploadModal/UploadModal';
import { AbstractUploader, UploaderFinishCallback } from './Upload/Uploader/AbstractUploader';
import { ImageElement } from './Elements/ImageElement';
import { HyperlinkElement } from './Elements/HyperlinkElement';
import { HyperlinkHelper } from './Helpers/HyperlinkHelper';
import { ImageHelper } from './Helpers/ImageHelper';
import { CustomStyleContextProvider } from '../shared/contexts/CustomStyle/Provider';
import { CustomStyle } from '../shared/contexts/CustomStyle/Context';

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

    // Holds css classes and values to customize the style of the editor
    customStyle?: CustomStyle;

    // If given, file uploads are enabled
    uploadInfo?: {
        // Uploader that is used for uploading files, see AbstractUploader to build your own uploader
        uploader: AbstractUploader;

        // If given, the selected file types will be validated before upload. Can be a comma seperated string of
        // valid mime types, including *, eg. "image/*, application/csv"
        acceptedFileTypes?: string;

        // If given, the selected file sizes (in bytes) will be validated before upload
        maxFileSize?: number;
    };
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
    const [editor] = useState(() => withVoids(withInlines(withReact(createEditor()))));
    const [uploadModalData, setUploadModalData] = useState<{
        show: boolean;
        accept?: string;
        forceAttachment?: boolean;
    }>({ show: false });

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
            case 'image':
                return <ImageElement {...props} />;
            case 'hyperlink':
                return <HyperlinkElement {...props} />;
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
                if (!shortcutText) break;

                // Find block matching shortcuts
                for (const helper of BlockHelpersArray) {
                    // matching shortcut with text or regex possible
                    if (shortcutText === helper.shortcutText || helper.shortcutRegex?.test(shortcutText)) {
                        // remove the shortcut text
                        SlateUtils.deleteFromLeft(editor, shortcutText.length);

                        // Render the corresponding markdown element
                        helper.toggle(editor, { actor: 'shortcut', actorShortcut: shortcutText });

                        // Prevent the newest key from being printed
                        event.preventDefault();

                        break; // TODO: must be double break here
                    }
                }

                if (!editor.selection) return;

                // Find inline matching shortcuts
                for (const helper of InlineHelpersArray) {
                    if (!helper.shortcutRegex) continue;

                    const match = shortcutText.match(helper.shortcutRegex);
                    if (!match) continue;

                    // Delete shortcut text
                    SlateUtils.deleteAt(
                        editor,
                        { path: editor.selection.anchor.path, offset: shortcutText.length - match[0].length },
                        match[0].length
                    );

                    // toggle inline node
                    helper.toggle(editor, { actor: 'shortcut', actorShortcutMatch: match });

                    // Prevent the newest key from being printed
                    event.preventDefault();

                    break;
                }

                break;
            }

            // Some components like list actions react on a tab press.
            case 'Tab': {
                const currentBlockType = SlateUtils.currentBlockType(editor);
                if (!currentBlockType) break;

                const onTabFunc = Helpers[currentBlockType].onTab;
                if (!onTabFunc) break;

                onTabFunc(editor, event);

                // prevent default is not called here, because the onTab handlers should be able to
                // decide whether the slate default action will be processed
                break;
            }

            // Normally pressing enter should create a new paragraph, but for some cases this should not be the case.
            // If some onEnter callback for the current block type exists, this will be handled instead of the default case
            case 'Enter': {
                const currentElementType = SlateUtils.currentElementType(editor);
                if (!currentElementType) break;

                // onEnter exists on current type => call onEnter
                const onEnterFunc = Helpers[currentElementType].onEnter;
                if (!onEnterFunc) break;

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

    /**
     * Called if the user requests some file upload.
     * Opens the dialog to upload the file.
     * The accept parameter is a comma separated string of accepted mime types.
     * If not given, everything will be accepted.
     * If forceAttachment is set to true, the uploaded file will be shown as link instead of rendered content.
     *
     * @param accept
     * @param forceAttachment
     */
    const onUploadRequest = (accept?: string, forceAttachment?: boolean) => {
        setUploadModalData({ show: true, accept: accept, forceAttachment: forceAttachment });
    };

    /**
     * Called if the upload modal should be closed.
     * Closes the upload modal and sets the focus to the editor again.
     */
    const onCloseUploadModal = () => {
        setUploadModalData({ show: false });

        ReactEditor.focus(editor);
    };

    /**
     * Called if some file upload was finished.
     * Creates an image or link tag, depending on the uploaded file type.
     * The originalFile is the file the user selected to upload.
     *
     * @param fileUrl
     * @param originalFile
     * @param metaData
     */
    const onUploadFinished: UploaderFinishCallback = (
        fileUrl: string,
        originalFile: File,
        metaData: Record<string, string>
    ) => {
        if (originalFile.type.includes('image') && !uploadModalData.forceAttachment) {
            if (!ImageHelper.onUpsert) return;

            ImageHelper.onUpsert(editor, { src: fileUrl, metaData: metaData });
        } else {
            if (!HyperlinkHelper.onUpsert) return;

            HyperlinkHelper.onUpsert(editor, {
                children: [{ text: originalFile.name }],
                href: fileUrl,
                metaData: metaData
            });
        }

        onCloseUploadModal();
    };

    return (
        <CustomStyleContextProvider value={props.customStyle}>
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
                <div className={`${styles.container} ${props.customStyle?.editor?.containerClassName || ''}`}>
                    <Toolbar onUploadRequest={props.uploadInfo ? onUploadRequest : undefined} />

                    <Editable
                        className={`${styles.editor} ${props.customStyle?.editor?.editorContainerClassName || ''}`}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={onKeyDown}
                    />
                </div>

                {props.uploadInfo && uploadModalData.show && (
                    <UploadModal
                        onUploadFinish={onUploadFinished}
                        onClose={onCloseUploadModal}
                        {...props.uploadInfo}
                        acceptedFileTypes={uploadModalData.accept || props.uploadInfo.acceptedFileTypes}
                    />
                )}
            </Slate>
        </CustomStyleContextProvider>
    );
};

/**
 * Overwrites the isInline method of the slate editor to specify the elemnts that should be rendered inline.
 *
 * @param editor
 */
const withInlines = (editor: CustomEditor): CustomEditor => {
    const { isInline } = editor;

    editor.isInline = (element: CustomElement): boolean => {
        const inlineTypes = InlineHelpersArray.map((helper) => helper.elementType);

        return inlineTypes.includes(element.type) || isInline(element);
    };

    return editor;
};

/**
 * Overwrites the isVoid method of the slate editor to specify the elemnts that should not render its children by slate.
 *
 * @param editor
 */
const withVoids = (editor: CustomEditor): CustomEditor => {
    const { isVoid } = editor;

    editor.isVoid = (element: CustomElement): boolean => {
        const inlineTypes = VoidHelpersArray.map((helper) => helper.elementType);

        return inlineTypes.includes(element.type) || isVoid(element);
    };

    return editor;
};
