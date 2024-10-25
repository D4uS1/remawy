import React, { Ref } from 'react';
/**
 * Props for the Input component.
 */
export interface FormInputProps {
    value: string;
    onChange: (value: string) => void;
    ref?: Ref<HTMLInputElement>;
    className?: string;
}
/**
 * Default one line Text input for forms.
 *
 * @param props
 * @constructor
 */
export declare const FormInput: (props: FormInputProps) => React.JSX.Element;
