/**
 * Type for a callback indicating a progress.
 * The progress number must be between 0 and 1 and indicate the percentage of upload progress.
 */
export type UploaderProgressCallback = (progress: number) => void;

/**
 * Type for a callback indicating some finished upload.
 * The url is the url to the file. The metaData is appended to the dom, hence this info can be
 * extracted later to do some operations on the file, like its deletion.
 */
export type UploaderFinishCallback = (url: string, originalFile: File, metaData: Record<string, string>) => void;

/**
 * Type for a callback indicating that some error occurred during upload.
 */
export type UploaderErrorCallback = (error: Error) => void;

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
     * @param file
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
        if (!this.onProgressViewCallback) return;

        this.onProgressViewCallback(progress);
    }

    /**
     * Should be called if the upload was finished.
     * The url must be the url to the uploaded file.
     * The originalFile is the file the user selected to upload.
     * The provided metadata are appended to the dom element of the image / link.
     *
     * @param url
     * @param originalFile
     * @param metaData
     * @protected
     */
    protected onFinish(url: string, originalFile: File, metaData: Record<string, string> = {}) {
        if (!this.onFinishViewCallback) return;

        this.onFinishViewCallback(url, originalFile, metaData);
    }

    /**
     * Should be called if some error occurs during upload.
     *
     * @param error
     * @protected
     */
    protected onError(error: Error) {
        if (!this.onErrorViewCallback) return;

        this.onErrorViewCallback(error);
    }

    /**
     * This is the callback that is called outside of the uploader to indicate the upload progress.
     * This callback should be set by the view that renders the progress by calling the setOnProgressViewCallback method.
     * This method should only be used by this package. To indicate the upload process in the uploader itself, call the onProgress method.
     *
     * @private
     */
    private onProgressViewCallback?: UploaderProgressCallback;

    /**
     * Sets the callback that is called if some upload progress occures.
     * This should only be called by the view that uses the uploader.
     */
    public setOnProgressViewCallback(callback: UploaderProgressCallback) {
        this.onProgressViewCallback = callback;
    }

    /**
     * This is the callback that is called outside of the uploader to indicate the upload finished.
     * This callback should be set by the view that renders the upload by calling the setOnFinishViewCallback method.
     * This method should only be used by this package. To indicate the upload finished in the uploader itself, use the onFinish callback.
     *
     * @private
     */
    private onFinishViewCallback?: UploaderFinishCallback;

    /**
     * Sets the callback that is called if some upload finished.
     * This should only be called by the view that uses the uploader.
     */
    public setOnFinishViewCallback(callback: UploaderFinishCallback) {
        this.onFinishViewCallback = callback;
    }

    /**
     * This is the callback that is called outside of the upload to indicate that some error occured during upload.
     * This callback should be set by the view that renders the upload by calling the setOnErrorViewCallback method.
     * This method should only be used by this package. To indicate that some error occured during upload in the uploader itself,
     * use the onError callback.
     *
     * @private
     */
    private onErrorViewCallback?: UploaderErrorCallback;

    public setOnErrorViewCallback(callback: UploaderErrorCallback) {
        this.onErrorViewCallback = callback;
    }

}