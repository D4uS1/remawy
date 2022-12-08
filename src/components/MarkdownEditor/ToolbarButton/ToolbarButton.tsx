import React, {useMemo} from 'react';
import styles from './ToolbarButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBold, faItalic, faListOl, faList, faQuoteLeft, faCode} from '@fortawesome/free-solid-svg-icons'

/**
 * Props for the ToolbarButton component.
 */
interface ToolbarButtonProps {
    // If given, the font-awesome icon will be shown
    icon?: 'bold' | 'blockquote' | 'code' | 'italic' | 'ordered-list' | 'unordered-list';

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
    const icon = useMemo(() => {
        switch (props.icon) {
            case 'bold': { return <FontAwesomeIcon icon={faBold} /> }
            case 'italic': { return <FontAwesomeIcon icon={faItalic} /> }
            case 'ordered-list': { return <FontAwesomeIcon icon={faListOl} /> }
            case 'unordered-list': { return <FontAwesomeIcon icon={faList} /> }
            case 'blockquote': { return <FontAwesomeIcon icon={faQuoteLeft} /> }
            case 'code': { return <FontAwesomeIcon icon={faCode} /> }
        }
    }, [props.icon]);

    return (
        <button className={`${styles.button} ${props.active ? '.active' : ''}`} onClick={props.onClick}>
            { icon ? icon : props.text }
        </button>
    )
}