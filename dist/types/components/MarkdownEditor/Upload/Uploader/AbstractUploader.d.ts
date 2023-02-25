/**
 * Type for a callback indicating a progress.
 * The progress number must be between 0 and 1 and indicate the percentage of upload progress.
 */
export type UploaderProgressCallback = (progress: number) => void;
/**
 * Type for a callback indicating some finished upload.
 * The url is the url to the file. The metaData holds information that can be useful for further operations
 * on the asset, like its deletion. It will be hold in the node props and will be used on serialization and deserialization.
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
export declare abstract class AbstractUploader {
    /**
     * Starts the upload of the specified file.
     * This is expected to be done asynchronous.
     *
     * @param file
     */
    abstract startUpload(file: File): Promise<void>;
    /**
     * Should be called oj upload progress.
     * The progress is expected to be a number between 0 and 1, indicating the percentage
     * of upload progress.
     *
     * @param progress
     * @protected
     */
    protected onProgress(progress: number): void;
    /**
     * Should be called if the upload was finished.
     * The url must be the url to the uploaded file.
     * The originalFile is the file the user selected to upload.
     * The provided metadata are information about the file that are needed to do further
     * operations on it, like its deletion. This information is kept in the node settings
     * and will be serialized and deserialized.
     *
     * @param url
     * @param originalFile
     * @param metaData
     * @protected
     */
    protected onFinish(url: string, originalFile: File, metaData?: Record<string, string>): void;
    /**
     * Should be called if some error occurs during upload.
     *
     * @param error
     * @protected
     */
    protected onError(error: Error): void;
    /**
     * This is the callback that is called outside of the uploader to indicate the upload progress.
     * This callback should be set by the view that renders the progress by calling the setOnProgressViewCallback method.
     * This method should only be used by this package. To indicate the upload process in the uploader itself, call the onProgress method.
     *
     * @private
     */
    private onProgressViewCallback?;
    /**
     * Sets the callback that is called if some upload progress occures.
     * This should only be called by the view that uses the uploader.
     */
    setOnProgressViewCallback(callback: UploaderProgressCallback): void;
    /**
     * This is the callback that is called outside of the uploader to indicate the upload finished.
     * This callback should be set by the view that renders the upload by calling the setOnFinishViewCallback method.
     * This method should only be used by this package. To indicate the upload finished in the uploader itself, use the onFinish callback.
     *
     * @private
     */
    private onFinishViewCallback?;
    /**
     * Sets the callback that is called if some upload finished.
     * This should only be called by the view that uses the uploader.
     */
    setOnFinishViewCallback(callback: UploaderFinishCallback): void;
    /**
     * This is the callback that is called outside of the upload to indicate that some error occured during upload.
     * This callback should be set by the view that renders the upload by calling the setOnErrorViewCallback method.
     * This method should only be used by this package. To indicate that some error occured during upload in the uploader itself,
     * use the onError callback.
     *
     * @private
     */
    private onErrorViewCallback?;
    setOnErrorViewCallback(callback: UploaderErrorCallback): void;
}
