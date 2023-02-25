import { AbstractUploader } from './AbstractUploader';
import { EzOnRailsAuthInfo } from 'ez-on-rails-react';
/**
 * Uploader to upload images or other assets to an ez-on-rails backend.
 */
export declare class EzOnRailsUploader extends AbstractUploader {
    private baseUrl;
    private authInfo;
    private apiVersion;
    /**
     * Constructor takes the baseUrl (the url that was already used at initializing the ez-on-rails-react component),
     * the authInfo of the current user and the apiVersion of the backend that is needed to accept the request.
     *
     * @param baseUrl
     * @param authInfo
     * @param apiVersion
     */
    constructor(baseUrl: string, authInfo: EzOnRailsAuthInfo, apiVersion: string);
    /**
     * Starts to upload the specified file to the backend.
     *
     * @param file
     */
    startUpload(file: File): Promise<void>;
    /**
     * Called if some direct upload updates its progress.
     * Calls the onProgress callback of the uploader that should update the view.
     *
     * @param event
     */
    onDirectUploadProgress(event: ProgressEvent<XMLHttpRequestEventTarget>): void;
}
