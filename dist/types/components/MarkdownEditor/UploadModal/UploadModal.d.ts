/// <reference types="react" />
import { AbstractUploader, UploaderFinishCallback } from '../Upload/Uploader/AbstractUploader';
/**
 * Props for the UploadModal component.
 */
interface UploadModalProps {
    uploader: AbstractUploader;
    onUploadFinish: UploaderFinishCallback;
    acceptedFileTypes?: string;
    maxFileSize?: number;
    onClose: () => void;
}
/**
 * Shows a modal that provides a form to upload a file.
 *
 * @param props
 * @constructor
 */
export declare const UploadModal: (props: UploadModalProps) => JSX.Element;
export {};
