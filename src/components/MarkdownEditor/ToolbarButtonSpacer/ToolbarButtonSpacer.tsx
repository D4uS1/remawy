import React from 'react';
import styles from './ToolbarButtonSpacer.module.css';

/**
 * Renders a spacer that can be used to separate button groups in the toolbar.
 *
 * @constructor
 */
export const ToolbarButtonSpacer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spacer}></div>
        </div>
    )
}