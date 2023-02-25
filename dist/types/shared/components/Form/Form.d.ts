import { ReactNode } from 'react';
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
    (props: FormProps): JSX.Element;
    Group: (props: import("../FormGroup/FormGroup").FormGroupProps) => JSX.Element;
    Label: (props: import("../FormLabel/FormLabel").FormLabelProps) => JSX.Element;
    Input: (props: import("../FormInput/FormInput").FormInputProps) => JSX.Element;
    Error: (props: import("../FormError/FormError").FormErrorProps) => JSX.Element;
    ButtonGroup: (props: import("../FormButtonGroup/FormButtonGroup").FormButtonGroupProps) => JSX.Element;
    Button: (props: import("../FormButton/FormButton").FormButtonProps) => JSX.Element;
};
export {};
