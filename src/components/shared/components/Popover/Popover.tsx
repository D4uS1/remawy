import React, { ReactNode, useRef } from 'react';
import styles from './Popover.module.css';
import { useOnClickOutside } from 'usehooks-ts';

/**
 * Props for the Popover component.
 */
interface PopoverProps {
    align: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

    // The content of the popover
    children: ReactNode;

    // Called if the user clicks outside the popover. Should close the popover.
    onClose: (e: MouseEvent) => void;
}

/**
 * Shows a popover at the current elements position, but overlapping the content.
 * The popover content is given by the props as children.
 *
 * @param props
 * @constructor
 */
export const Popover = (props: PopoverProps) => {
    const clickOutsideRef = useRef<HTMLDivElement>(null);

    // Clicking outside the modal should close the modal
    useOnClickOutside(clickOutsideRef, props.onClose);

    return (
        <div className={styles.container}>
            <div className={`${styles.innerContainer} ${props.align}`} ref={clickOutsideRef}>
                {props.children}
            </div>
        </div>
    );
};
