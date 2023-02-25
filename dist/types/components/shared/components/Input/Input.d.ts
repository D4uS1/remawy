import { Ref } from 'react';
/**
 * Props for the Input component.
 */
interface InputProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    ref?: Ref<HTMLInputElement>;
}
/**
 * Default one line Text input for forms.
 *
 * @param props
 * @constructor
 */
export declare const Input: (props: InputProps) => JSX.Element;
export {};
