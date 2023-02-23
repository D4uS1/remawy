import React, { ReactNode, useContext } from 'react';
import styles from './FormButtonGroup.module.css';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';

/**
 * Props for the FormButtonGroup component.
 */
export interface FormButtonGroupProps {
    // The content of the button group
    children: ReactNode;
}

/**
 * Container component holding form buttons like the submit button.
 *
 * @param props
 * @constructor
 */
export const FormButtonGroup = (props: FormButtonGroupProps) => {
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);

    return (
        <div className={`${styles.container} ${customStyle?.forms?.buttonsContainerClassName || ''}`}>
            {props.children}
        </div>
    );
};
