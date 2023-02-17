import { useSlate } from 'slate-react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SlateUtils } from '../Utils/SlateUtils';
import styles from './ImageToolbarButton.module.css';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';
import { Popover } from '../../shared/components/Popover/Popover';
import formStyles from '../../shared/styles/forms.module.css';
import { Button } from '../../shared/components/Button/Button';
import { ImageHelper } from '../Helpers/ImageHelper';

/**
 * Shows a toolbar button for creating or editing an image.
 *
 * @constructor
 */
export const ImageToolbarButton = () => {
    const editor = useSlate();
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [src, setSrc] = useState<string>('');
    const srcInputRef = useRef<HTMLInputElement>(null);

    /**
     * Called if the popover is shown to determine the current src value in the selection, if exists.
     * Also focuses the text field to be able to type without clicking in it.
     */
    useEffect(() => {
        if (!showPopover) return;

        // focus the textfield
        srcInputRef.current?.focus();

        // find initial value for href
        const nearestImage = SlateUtils.nearestElementOfType(editor, 'image');
        if (!nearestImage || !nearestImage.src)
            return setSrc('https://niiice.io/wp-content/uploads/2020/04/niiice-Logo_dark.png');

        setSrc(nearestImage.src);
    }, [showPopover, editor]);

    /**
     * Called if the popover holding the form values should be closed.
     * Closes the popover.
     */
    const onClosePopover = () => {
        setShowPopover(false);
    };

    /**
     * Called if the user clicks the button.
     * Opens the Popover for the hyperlink form values.
     */
    const onClickToolbarButton = () => {
        setShowPopover(!showPopover);
    };

    /**
     * Called if the src was changed.
     * Updates the value to the state.
     *
     * @param event
     */
    const onChangeSrc = (event: ChangeEvent<HTMLInputElement>) => {
        setSrc(event.target.value);
    };

    /**
     * Called if the user submits the data.
     * Inserts the link having the specified title and href.
     */
    const onClickSubmit = () => {
        if (!ImageHelper.onUpsert) return;

        ImageHelper.onUpsert(editor, { src: src });
        onClosePopover();
    };

    /**
     * Called if the user presses the enter button in the popover form.
     * Submits the form.
     */
    const onPressEnter = () => {
        onClickSubmit();
    };

    return (
        <div className={styles.container}>
            <ToolbarButton onClick={onClickToolbarButton} icon="image" />
            {showPopover && (
                <Popover onClose={onClosePopover} onPressEnter={onPressEnter} align="top-right">
                    <div className={formStyles.container}>
                        <div className={formStyles.group}>
                            <label>Url</label>
                            <input ref={srcInputRef} value={src} onChange={onChangeSrc} className={styles.hrefInput} />
                        </div>

                        <div className={formStyles.buttonsContainer}>
                            <Button type="primary" onClick={onClickSubmit}>
                                Insert
                            </Button>
                        </div>
                    </div>
                </Popover>
            )}
        </div>
    );
};
