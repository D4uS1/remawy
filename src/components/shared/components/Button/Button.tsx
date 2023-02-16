import React, {ReactNode} from "react";
import styles from './Button.module.css';

/**
 * Props for the Button component.
 */
interface ButtonProps {
    // The type of the button, defining its design
    type: 'primary' | 'secondary';

    // Called if the user clicks the button
    onClick: () => void;

    // The content inside the button
    children: ReactNode;
}

export const Button = (props: ButtonProps) => {
    return (
        <button className={`${styles.button} ${props.type}`} onClick={props.onClick}>
            { props.children }
        </button>
    )
}