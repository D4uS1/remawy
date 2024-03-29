import React, { useMemo, MouseEvent, useContext } from 'react';
import styles from './ToolbarButton.module.css';
import { FaBold, FaItalic, FaListOl, FaList, FaQuoteLeft, FaCode, FaUpload, FaLink, FaImage } from 'react-icons/fa';
import { CustomStyle, CustomStyleContext } from '../../../shared/contexts/CustomStyle/Context';

/**
 * Props for the ToolbarButton component.
 */
interface ToolbarButtonProps {
    // If given, the font-awesome icon will be shown
    icon?:
        | 'bold'
        | 'blockquote'
        | 'code'
        | 'italic'
        | 'ordered-list'
        | 'unordered-list'
        | 'upload'
        | 'hyperlink'
        | 'image';

    // If no icon is given, the text will be shown
    text?: string;

    // Indicates whether the button should be rendered as "currently active" button
    active?: boolean;

    // Called if the user clicks the button
    onClick: () => void;
}

/**
 * A button for the toolbar of the editor.
 *
 * @param props
 * @constructor
 */
export const ToolbarButton = (props: ToolbarButtonProps) => {
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);

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

            case 'hyperlink': {
                return <FaLink />;
            }

            case 'image': {
                return <FaImage />;
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
            className={`${styles.button} ${customStyle?.toolbar?.buttonClassName || ''} ${
                props.active ? 'active' : ''
            }`}
            onClick={props.onClick}
        >
            {icon ? icon : props.text}
        </button>
    );
};
