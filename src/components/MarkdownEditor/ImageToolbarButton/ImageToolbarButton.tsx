import { useSlate } from 'slate-react';
import React, { useEffect, useRef, useState } from 'react';
import { SlateUtils } from '../Utils/SlateUtils';
import styles from './ImageToolbarButton.module.css';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';
import { Popover } from '../../shared/components/Popover/Popover';
import { ImageHelper } from '../Helpers/ImageHelper';
import { Form } from '../../shared/components/Form/Form';

/**
 * Props for the ImageToolbarButton component.
 */
interface ImageToolbarButtonProps {
    // Called if the user wants to upload some file, should open the upload modal. The accept parameter are
    // comma separated mime types. If not given, everything will be accepted.
    onUploadRequest?: (accept?: string) => void;
}

/**
 * Shows a toolbar button for creating or editing an image.
 *
 * @constructor
 */
export const ImageToolbarButton = (props: ImageToolbarButtonProps) => {
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

    /**
     * Called if the user clicks the upload button.
     * Closes the popup and opens the upload modal.
     */
    const onClickUpload = () => {
        if (!props.onUploadRequest) return;

        onClosePopover();
        props.onUploadRequest('image/*');
    };

    return (
        <div className={styles.container}>
            <ToolbarButton onClick={onClickToolbarButton} icon="image" />
            {showPopover && (
                <Popover onClose={onClosePopover} onPressEnter={onPressEnter} align="top-right">
                    <Form>
                        <Form.Group>
                            <Form.Label text={'Url'} />
                            <Form.Input ref={srcInputRef} value={src} onChange={setSrc} />
                        </Form.Group>

                        <Form.ButtonGroup>
                            {props.onUploadRequest && (
                                <Form.Button type={'secondary'} onClick={onClickUpload}>
                                    Upload
                                </Form.Button>
                            )}

                            <Form.Button type="primary" onClick={onClickSubmit}>
                                Insert
                            </Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                </Popover>
            )}
        </div>
    );
};
