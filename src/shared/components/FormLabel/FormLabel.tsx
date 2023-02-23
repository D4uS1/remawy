import React, { useContext } from 'react';
import styles from './FormLabel.module.css';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';

/**
 * Props for the FormLabel component.
 */
export interface FormLabelProps {
    // The text shown in a label
    text: string;
}

/**
 * Shows a label for a field in a form group.
 *
 * @param props
 * @constructor
 */
export const FormLabel = (props: FormLabelProps) => {
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);

    return <label className={`${styles.label} ${customStyle?.forms?.labelClassName}`}>{props.text}</label>;
};
