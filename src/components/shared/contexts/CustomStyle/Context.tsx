import { createContext } from 'react';

/**
 * Defines the value that is saved in the context.
 * Holds all css classes and other attributes needed to customize the style of ReMaWy.
 */
export interface CustomStyle {
    // Styles for the editor itself
    editor?: {
        // Optional class name that is passed to the outer container, holding the toolbar and the editor
        containerClassName?: string;

        // Optional css class name that is passed to the editor container, holding the content
        editorContainerClassName?: string;
    };

    // Styles for the toolbar of the editor
    toolbar?: {
        // Optional css class name that is passed to the toolbar container
        containerClassName?: string;

        // Optional css class name that is passed to the toolbar buttons
        buttonClassName?: string;
    };

    // Styles for the upload modal of the editor
    uploadModal?: {
        // Optional css class that is passed to the modal outer container (the absolute container)
        containerClassName?: string;

        // Optional css class that is passed to the modal inner container, holding the upload form (the relative container)
        innerContainerClassName?: string;

        // Optional css class that is passed to the modal header holding the close button
        headerContainerClassName?: string;

        // Optional css class name that is passed to the modal body holding the form
        bodyContainerClassName?: string;
    };
}

export const CustomStyleContext = createContext<CustomStyle | undefined>(undefined);
