/// <reference types="react" />
import { AbstractUploader, UploaderFinishCallback } from './Upload/Uploader/AbstractUploader';
/**
 * Props for the UploadModal component.
 */
interface UploadModalProps {
    uploader: AbstractUploader;
    onUploadFinish: UploaderFinishCallback;
    acceptedFileTypes?: string;
    invalidFileTypeMessage?: string;
    maxFileSize?: number;
    maxFileSizeMessage?: string;
    onClose: () => void;
    modalHeaderTitle?: string;
}
/**
 * Shows a modal that provides a form to upload a file.
 *
 * @param props
 * @constructor
 */
export declare const UploadModal: (props: UploadModalProps) => JSX.Element;
export {};
