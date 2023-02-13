import React, {ReactNode} from "react";
import styles from './Popover.module.css';

/**
 * Props for the Popover component.
 */
interface PopoverProps {
    // The content of the popover
    children: ReactNode
}

/**
 * Shows a popover at the current elements position, but overlapping the content.
 * The popover content is given by the props as children.
 *
 * @param props
 * @constructor
 */
export const Popover = (props: PopoverProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                { props.children }
            </div>
        </div>
    )
}