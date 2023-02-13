import React, { ReactNode, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styles from './Modal.module.css';
import { useOnClickOutside } from 'usehooks-ts';

/**
 * Props for the Modal component.
 */
interface ModalProps {
    // The title shown in the header
    title: string;

    // Called if the user clicks outside the modal or the close button
    onClose: () => void;

    // The body content of the modal
    children: ReactNode;

    // Optional css class name for the container (the outer absolute container)
    containerClassName?: string;

    // Optional css class name for the inner container (the relative container holding the content)
    innerContainerClassName?: string;

    // Optional css class name for the container holding the title and the close button.
    headerContainerClassName?: string;

    // Optional css class for the body container holding the content
    bodyContainerClassName?: string;
}

/**
 * Shows a modal having the children given by the props as content.
 * The modal also has a header with a title, that is given by the props.
 * The design of the modal is customizable via the className props.
 *
 * @param props
 * @constructor
 */
export const Modal = (props: ModalProps) => {
    const clickOutsideRef = useRef<HTMLDivElement>(null);

    // Clicking outside the modal should close the modal
    useOnClickOutside(clickOutsideRef, props.onClose);

    return (
        <div className={`${styles.container} ${props.containerClassName || ''}`}>
            <div className={`${styles.innerContainer} ${props.innerContainerClassName || ''}`} ref={clickOutsideRef}>
                <div className={`${styles.headerContainer} ${props.headerContainerClassName || ''}`}>
                    <span className={styles.header}>{props.title}</span>
                    <button className={styles.closeButton} onClick={props.onClose}>
                        <IoCloseOutline size="1.5rem" />
                    </button>
                </div>
                <div className={`${styles.bodyContainer} ${props.bodyContainerClassName || ''}`}>{props.children}</div>
            </div>
        </div>
    );
};
