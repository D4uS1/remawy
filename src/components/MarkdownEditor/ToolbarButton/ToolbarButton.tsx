import React, { useMemo, MouseEvent } from 'react';
import styles from './ToolbarButton.module.css';
import { FaBold, FaItalic, FaListOl, FaList, FaQuoteLeft, FaCode, FaUpload } from 'react-icons/fa';

/**
 * Props for the ToolbarButton component.
 */
interface ToolbarButtonProps {
    // If given, the font-awesome icon will be shown
    icon?: 'bold' | 'blockquote' | 'code' | 'italic' | 'ordered-list' | 'unordered-list' | 'upload';

    // If no icon is given, the text will be shown
    text?: string;

    // Indicates whether the button should be rendered as "currently active" button
    active?: boolean;

    // Called if the user clicks the button
    onClick: () => void;

    // Optional class name that is passed to the button
    className?: string;
}

/**
 * A button for the toolbar of the editor.
 *
 * @param props
 * @constructor
 */
export const ToolbarButton = (props: ToolbarButtonProps) => {
    const icon = useMemo(() => {
        switch (props.icon) {
            case 'bold': {
                return <FaBold />;
            }

            case 'italic': {
                return <FaItalic />;
            }

            case 'ordered-list': {
                return <FaListOl />;
            }

            case 'unordered-list': {
                return <FaList />;
            }

            case 'blockquote': {
                return <FaQuoteLeft />;
            }

            case 'code': {
                return <FaCode />;
            }

            case 'upload': {
                return <FaUpload />;
            }
        }
    }, [props.icon]);

    /**
     * Called if the mousedown event of the button was triggered.
     * Calls preventDefault to make the editor window not to loose focus if the button was pressed.
     *
     * @param event
     */
    const onMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <button
            onMouseDown={onMouseDown}
            className={`${styles.button} ${props.className || ''} ${props.active ? 'active' : ''}`}
            onClick={props.onClick}
        >
            {icon ? icon : props.text}
        </button>
    );
};
