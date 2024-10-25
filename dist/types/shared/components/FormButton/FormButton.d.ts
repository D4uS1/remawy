import React, { ReactNode } from 'react';
/**
 * Props for the Button component.
 */
export interface FormButtonProps {
    type: 'primary' | 'secondary' | 'danger';
    onClick: () => void;
    children: ReactNode;
}
export declare const FormButton: (props: FormButtonProps) => React.JSX.Element;
