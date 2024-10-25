import React, { FocusEvent } from 'react';
import { CustomElement } from './Types/CustomElement';
import { CustomText } from './Types/CustomText';
import { CustomEditor } from './Types/CustomEditor';
import { AbstractUploader } from './Upload/Uploader/AbstractUploader';
import { CustomStyle } from '../../shared/contexts/CustomStyle/Context';
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
 * Describes the type of the value the editor holds.
 */
export type EditorValue = CustomElement[];
/**
 * Props for the MarkdownEditor component.
 */
export interface MarkdownEditorProps {
    onChange?: (value: EditorValue) => void;
    onBlur?: (event: FocusEvent<HTMLDivElement>, value: EditorValue) => void;
    initialValue?: EditorValue;
    defaultText?: string;
    customStyle?: CustomStyle;
    uploadInfo?: {
        uploader: AbstractUploader;
        acceptedFileTypes?: string;
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
export declare const MarkdownEditor: (props: MarkdownEditorProps) => React.JSX.Element;
