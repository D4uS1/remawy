import React, { useContext } from 'react';
import styles from './FormError.module.css';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';

/**
 * Props for the FormError component.
 */
export interface FormErrorProps {
    text: string;
}

/**
 * Shosws an error message for a field in a form group.
 *
 * @param props
 * @constructor
 */
export const FormError = (props: FormErrorProps) => {
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);

    return <span className={`${styles.error} ${customStyle?.forms?.errorClassName || ''}`}>{props.text}</span>;
};
