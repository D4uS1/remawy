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

    // popovers for some buttons that hold additional forms like hyperlink or image buttons.
    popover?: {
        // Optional css class name that is passed to the outer container of popovers.
        // This is the outer container having the position relative attribute.
        containerClassName?: string;

        // Optional css class name that is passed to the inner container of popovers.
        // This is the inner container having the position absolute attribute.
        innerContainerClassName?: string;
    };

    // Styles for the upload modal of the editor
    modal?: {
        // Optional css class that is passed to the modal outer container (the absolute container)
        containerClassName?: string;

        // Optional css class that is passed to the modal inner container, holding the upload form (the relative container)
        innerContainerClassName?: string;

        // Optional css class that is passed to the modal header holding the close button
        headerContainerClassName?: string;

        // Optional css class name that is passed to the modal body holding the form
        bodyContainerClassName?: string;
    };

    // Styles for additional forms like the ones in the popovers for the image or hyperlink buttons
    forms?: {
        // Optional css class name for the container of the form
        containerClassName?: string;

        // Optional css class for a form group holding a label, the field and an error message
        groupClassName?: string;

        // Optional css class for a label in a form group
        labelClassName?: string;

        // Optional css class for a text input in a form group
        inputClassName?: string;

        // Optional css class for a error in a form
        errorClassName?: string;

        // Optional css class for the container holding the buttons like the submit button
        buttonsContainerClassName?: string;

        // Optional css class for a button in a form.
        // Note that the colors can be changed by chaining this class name with a class of the button type.
        // Available types are primary, secondary and danger
        buttonClassName?: string;
    };
}

export const CustomStyleContext = createContext<CustomStyle | undefined>(undefined);
