import React, { ReactNode } from 'react';
/**
 * Props for the Modal component.
 */
interface ModalProps {
    title: string;
    onClose: () => void;
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
export declare const Modal: (props: ModalProps) => React.JSX.Element;
export {};
