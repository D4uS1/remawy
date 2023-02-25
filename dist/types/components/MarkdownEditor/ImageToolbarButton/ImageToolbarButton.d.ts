/// <reference types="react" />
/**
 * Props for the ImageToolbarButton component.
 */
interface ImageToolbarButtonProps {
    onUploadRequest?: (accept?: string) => void;
}
/**
 * Shows a toolbar button for creating or editing an image.
 *
 * @constructor
 */
export declare const ImageToolbarButton: (props: ImageToolbarButtonProps) => JSX.Element;
export {};
