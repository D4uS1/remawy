import React, { ReactNode } from 'react';
/**
 * Props for the FormGroup component.
 */
export interface FormGroupProps {
    children: ReactNode;
}
/**
 * Container component for form groups holding a label, a field and an error message.
 *
 * @param props
 * @constructor
 */
export declare const FormGroup: (props: FormGroupProps) => React.JSX.Element;
