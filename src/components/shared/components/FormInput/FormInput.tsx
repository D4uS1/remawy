import React, { ChangeEvent, Ref, useContext } from 'react';
import styles from './Input.module.css';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';

/**
 * Props for the Input component.
 */
export interface InputProps {
    // The current input content
    value: string;

    // Called if the content of the input changed
    onChange: (value: string) => void;

    // Optional ref to the input
    ref?: Ref<HTMLInputElement>;
}

/**
 * Default one line Text input for forms.
 *
 * @param props
 * @constructor
 */
export const FormInput = (props: InputProps) => {
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
            className={`${styles.input} ${customStyle?.forms?.inputClassName || ''}`}
            value={props.value}
            onChange={onChange}
        />
    );
};
