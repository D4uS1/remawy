import React, { ReactNode, useContext, MouseEvent } from 'react';
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

    /**
     * Called if the mouse button was pressed in the button.
     * Prevents the event to prevent the editor from loosing focus on clicking.
     * This is needed because if the onBlur event in the editor is used to get the current value,
     * it would be triggered on pressing the button.
     *
     * @param event
     */
    const onMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <button
            className={`${styles.button} ${customStyles?.forms?.buttonClassName} ${props.type}`}
            onClick={props.onClick}
            onMouseDown={onMouseDown}
        >
            {props.children}
        </button>
    );
};
