import { ReactNode } from "react";
/**
 * Props for the Popover component.
 */
interface PopoverProps {
    align: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    children: ReactNode;
    onClose: () => void;
}
/**
 * Shows a popover at the current elements position, but overlapping the content.
 * The popover content is given by the props as children.
 *
 * @param props
 * @constructor
 */
export declare const Popover: (props: PopoverProps) => JSX.Element;
export {};
