/**
 * Abstract class of an Uploader to upload files that can be used
 * as images or other linked assets in the editor. The startUpload method must be implemented.
 * This method should upload the file asynchronous.
 * The upload progress can be indicated by calling the onProgress method of this class.
 * If the upload finished, the onFinish method of this class must be called.
 */
export abstract class AbstractUploader {

    /**
     * Starts the upload of the specified file.
     * This is expected to be done asynchronous.
     *
     * @param files
     */
    public abstract startUpload(file: File): Promise<void>;


    /**
     * Should be called oj upload progress.
     * The progress is expected to be a number between 0 and 1, indicating the percentage
     * of upload progress.
     *
     * @param progress
     * @protected
     */
    protected onProgress(progress: number) {

    }

    /**
     * Should be called if the upload was finished.
     * The url must be the url to the uploaded file.
     * The provided metadata are appended to the dom element of the image / link.
     *
     * @param url
     * @param metadata
     * @protected
     */
    protected onFinish(url: string, metadata: Record<string, string> = {}) {

    }

    /**
     * Should be called if some error occurs during upload.
     *
     * @param errorMessage
     * @protected
     */
    protected onError(error: Error) {

    }
}