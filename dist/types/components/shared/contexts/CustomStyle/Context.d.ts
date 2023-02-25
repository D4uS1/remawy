/// <reference types="react" />
/**
 * Defines the value that is saved in the context.
 * Holds all css classes and other attributes needed to customize the style of ReMaWy.
 */
export interface CustomStyle {
    texts?: {
        url?: string;
        insert?: string;
        remove?: string;
        upload?: string;
        uploadModalHeaderTitle?: string;
        invalidFileTypeError?: string;
        maxFileSizeError?: string;
    };
    editor?: {
        containerClassName?: string;
        editorContainerClassName?: string;
    };
    toolbar?: {
        containerClassName?: string;
        buttonClassName?: string;
    };
    popover?: {
        containerClassName?: string;
        innerContainerClassName?: string;
    };
    modal?: {
        containerClassName?: string;
        innerContainerClassName?: string;
        headerContainerClassName?: string;
        bodyContainerClassName?: string;
    };
    forms?: {
        containerClassName?: string;
        groupClassName?: string;
        labelClassName?: string;
        inputClassName?: string;
        errorClassName?: string;
        buttonsContainerClassName?: string;
        buttonClassName?: string;
    };
}
export declare const CustomStyleContext: import("react").Context<CustomStyle | undefined>;
