import React, { ReactNode, useContext, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styles from './Modal.module.css';
import { useOnClickOutside } from 'usehooks-ts';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';

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
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);
    const clickOutsideRef = useRef<HTMLDivElement>(null);

    // Clicking outside the modal should close the modal
    // @ts-ignore TODO remove if https://github.com/juliencrn/usehooks-ts/issues/663 is fixed
    useOnClickOutside(clickOutsideRef, props.onClose);

    return (
        <div className={`${styles.container} ${customStyle?.modal?.containerClassName || ''}`}>
            <div
                className={`${styles.innerContainer} ${customStyle?.modal?.innerContainerClassName || ''}`}
                ref={clickOutsideRef}
            >
                <div className={`${styles.headerContainer} ${customStyle?.modal?.headerContainerClassName || ''}`}>
                    <span className={styles.header}>{props.title}</span>
                    <button className={styles.closeButton} onClick={props.onClose}>
                        <IoCloseOutline size="1.5rem" />
                    </button>
                </div>
                <div className={`${styles.bodyContainer} ${customStyle?.modal?.bodyContainerClassName || ''}`}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};
