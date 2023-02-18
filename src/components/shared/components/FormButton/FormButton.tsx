import React, { ReactNode, useContext } from 'react';
import styles from './FormButton.module.css';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';

/**
 * Props for the Button component.
 */
export interface FormButtonProps {
    // The type of the button, defining its design
    type: 'primary' | 'secondary' | 'danger';

    // Called if the user clicks the button
    onClick: () => void;

    // The content inside the button
    children: ReactNode;
}

export const FormButton = (props: FormButtonProps) => {
    const customStyles = useContext<CustomStyle | undefined>(CustomStyleContext);

    return (
        <button
            className={`${styles.button} ${customStyles?.forms?.buttonClassName} ${props.type}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};
