import React, { ChangeEvent, Ref, useContext } from 'react';
import styles from './FormInput.module.css';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';

/**
 * Props for the Input component.
 */
export interface FormInputProps {
    // The current input content
    value: string;

    // Called if the content of the input changed
    onChange: (value: string) => void;

    // Optional ref to the input
    ref?: Ref<HTMLInputElement>;

    // Optional class name that is added to the input
    className?: string;
}

/**
 * Default one line Text input for forms.
 *
 * @param props
 * @constructor
 */
export const FormInput = (props: FormInputProps) => {
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);

    /**
     * Called if the content of the input changed.
     * Calls the callback given by the props.
     *
     * @param event
     */
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value);
    };

    return (
        <input
            ref={props.ref}
            className={`${styles.input} ${props.className || undefined} ${customStyle?.forms?.inputClassName || ''}`}
            value={props.value}
            onChange={onChange}
        />
    );
};
