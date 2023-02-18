import React, { ReactNode, useContext } from 'react';
import styles from './FormGroup.module.css';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';

/**
 * Props for the FormGroup component.
 */
export interface FormGroupProps {
    // The content shown in the form group
    children: ReactNode;
}

/**
 * Container component for form groups holding a label, a field and an error message.
 *
 * @param props
 * @constructor
 */
export const FormGroup = (props: FormGroupProps) => {
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);

    return <div className={`${styles.container} ${customStyle?.forms?.groupClassName || ''}`}>{props.children}</div>;
};
