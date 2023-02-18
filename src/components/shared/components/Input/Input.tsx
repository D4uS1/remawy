import React, { ChangeEvent, Ref } from 'react';
import styles from './Input.module.css';

/**
 * Props for the Input component.
 */
interface InputProps {
    // The current input content
    value: string;

    // Called if the content of the input changed
    onChange: (value: string) => void;

    // Optional class name for the input field
    className?: string;

    // Optional ref to the input
    ref?: Ref<HTMLInputElement>;
}

/**
 * Default one line Text input for forms.
 *
 * @param props
 * @constructor
 */
export const Input = (props: InputProps) => {
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
            className={`${styles.input} ${props.className || ''}`}
            value={props.value}
            onChange={onChange}
        />
    );
};
