import { ReactNode } from 'react';
/**
 * Props for the Button component.
 */
interface ButtonProps {
    type: 'primary' | 'secondary' | 'danger';
    onClick: () => void;
    children: ReactNode;
}
export declare const Button: (props: ButtonProps) => JSX.Element;
export {};
