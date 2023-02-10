import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    AbstractUploader,
    UploaderErrorCallback,
    UploaderFinishCallback,
    UploaderProgressCallback
} from './Upload/Uploader/AbstractUploader';
import styles from './UploadModal.module.css';

/**
 * Props for the UploadModal component.
 */
interface UploadModalProps {
    // The uploader that is used to uplad the files
    uploader: AbstractUploader;

    // Called if the upload of a file to the specified url was finished.
    // The metadata should be used to be appended to the dom. This can be used to save additional data needed
    // for further operations on the file.
    onUploadFinish: UploaderFinishCallback;

    // If given, the selected file types will be validated before upload. Can be a comma seperated string of
    // valid mime types, including *, eg. "image/*, application/csv"
    acceptedFileTypes?: string;

    // If given, this message will be shown if the user wants to upload a file with an invalid file type
    invalidFileTypeMessage?: string;

    // If given, the selected file sizes (in bytes) will be validated before upload
    maxFileSize?: number;

    // If given, this message will be shown if the user wants to upload a file that is too large
    maxFileSizeMessage?: string;

    // Called if the modal should be closed
    onClose: () => void;
}

/**
 * Shows a modal that provides a form to upload a file.
 *
 * @param props
 * @constructor
 */
export const UploadModal = (props: UploadModalProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    /**
     * Called if the current upload failes.
     * Shows the error.
     *
     * @param error
     */
    const onUploadError: UploaderErrorCallback = (error: Error) => {
        setErrorMessage(error.message);
    };

    /**
     * Called on progress for the current upload.
     * Shows the upload progress.
     *
     * @param progress
     */
    const onUploadProgress: UploaderProgressCallback = (progress: number) => {
        setUploadProgress(progress);
    };

    /**
     * Called if the uploader in the props changes.
     * Sets the view callbacks in the uploader to be able to track upload process, upload finish and upload errors.
     */
    useEffect(() => {
        props.uploader.setOnProgressViewCallback(onUploadProgress);
        props.uploader.setOnErrorViewCallback(onUploadError);
        props.uploader.setOnFinishViewCallback(props.onUploadFinish);
    }, [props.uploader]);

    /**
     * Called if the user selected some file.
     * Uploads the file using the uploader given by the props.
     *
     * @param event
     */
    const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        // First hide errors, in case of retry
        setErrorMessage(null);

        // get selected files
        const files = event.currentTarget.files;
        if (!files) return;

        // Convert to array because FileList is not really a list.
        // This is because javascript is just HUEHUEHUEHUEHUEHUEHUEHUEHUEHUEHUE
        const selectedFiles = Array.from(files);

        // check file types
        if (props.acceptedFileTypes) {
            for (const file of selectedFiles) {
                if (!fileTypeMatches(file.type, props.acceptedFileTypes)) {
                    return setErrorMessage(props.invalidFileTypeMessage || 'Invalid file type.');
                }
            }
        }

        // check file size
        if (props.maxFileSize) {
            for (const file of selectedFiles) {
                if (file.size > props.maxFileSize) {
                    return setErrorMessage(props.maxFileSizeMessage || 'File too large.');
                }
            }
        }

        // Start uploading each file and add it to the current files
        setUploadProgress(0);

        for (const selectedFile of selectedFiles) {
            props.uploader.startUpload(selectedFile).then();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <button onClick={props.onClose}>X</button>

                <input type="file" onChange={onFileSelect} />

                {errorMessage && <span>{errorMessage}</span>}

                {uploadProgress !== null && <progress max={100.0} value={uploadProgress * 100} />}
            </div>
        </div>
    );
};

/**
 * Returns whether the specified fileType matches any of the specified expected file types.
 * expectedFileTypes is expected to be a comma separated value of valid file types.
 * Stars (*) are allowed to define any valid "subtype", like image/*.
 *
 * @param fileType
 * @param expectedFileTypes
 */
const fileTypeMatches = (fileType: string, expectedFileTypes: string): boolean => {
    // remove all whitespaces
    expectedFileTypes = expectedFileTypes.replace(/\s/g, '');

    // convert to array
    const expectedFileTypesArray = expectedFileTypes.split(',');

    // check the types
    return expectedFileTypesArray.some((expectedFileType: string) => {
        if (expectedFileType.endsWith('/*')) {
            const mainType = expectedFileType.split('/')[0];
            return fileType.startsWith(mainType);
        } else {
            return expectedFileType === fileType;
        }
    });
};
