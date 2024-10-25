import React, { ReactNode } from 'react';
/**
 * Props for the Form component.
 */
interface FormProps {
    children: ReactNode;
}
/**
 * Container class for forms.
 * Holds the content provided by the children.
 *
 * @constructor
 */
export declare const Form: {
    (props: FormProps): React.JSX.Element;
    Group: (props: import("../FormGroup/FormGroup").FormGroupProps) => React.JSX.Element;
    Label: (props: import("../FormLabel/FormLabel").FormLabelProps) => React.JSX.Element;
    Input: (props: import("../FormInput/FormInput").FormInputProps) => React.JSX.Element;
    Error: (props: import("../FormError/FormError").FormErrorProps) => React.JSX.Element;
    ButtonGroup: (props: import("../FormButtonGroup/FormButtonGroup").FormButtonGroupProps) => React.JSX.Element;
    Button: (props: import("../FormButton/FormButton").FormButtonProps) => React.JSX.Element;
};
export {};
