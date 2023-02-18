import React, { ReactNode, useRef, KeyboardEvent, useContext } from 'react';
import styles from './Popover.module.css';
import { useOnClickOutside } from 'usehooks-ts';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';

/**
 * Props for the Popover component.
 */
interface PopoverProps {
    align: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

    // The content of the popover
    children: ReactNode;

    // Called if the user clicks outside the popover. Should close the popover.
    onClose: (e: MouseEvent) => void;

    // Called if the user presses the enter button inside the popup
    onPressEnter?: () => void;
}

/**
 * Shows a popover at the current elements position, but overlapping the content.
 * The popover content is given by the props as children.
 *
 * @param props
 * @constructor
 */
export const Popover = (props: PopoverProps) => {
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);
    const clickOutsideRef = useRef<HTMLDivElement>(null);

    // Clicking outside the modal should close the modal
    useOnClickOutside(clickOutsideRef, props.onClose);

    /**
     * Called if the user presses some key in the popup.
     * If the callback for pressing enter is given by the props and the pressed button was the enter button,
     * the callback will be called.
     *
     * @param e
     */
    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (!props.onPressEnter) return;

        if (e.key === 'Enter') {
            props.onPressEnter();
        }
    };

    return (
        <div className={`${styles.container} ${customStyle?.popover?.containerClassName || ''}`}>
            <div
                className={`${styles.innerContainer} ${props.align} ${
                    customStyle?.popover?.innerContainerClassName || ''
                }`}
                ref={clickOutsideRef}
                onKeyDown={onKeyDown}
            >
                {props.children}
            </div>
        </div>
    );
};
