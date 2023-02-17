import React, {ChangeEvent, useMemo, useState} from 'react';
import {ToolbarButton} from "../ToolbarButton/ToolbarButton";
import {Popover} from "../../shared/components/Popover/Popover";
import styles from './HyperlinkToolbarButton.module.css';
import formStyles from '../../shared/styles/forms.module.css'
import {Button} from "../../shared/components/Button/Button";
import {CustomEditor} from "../Types/CustomEditor";
import {useSlate} from "slate-react";
import {HyperLinkHelper} from "../Helpers/HyperLinkHelper";
import {SlateUtils} from "../Utils/SlateUtils";

/**
 * Props for the HyperlinkToolbarButton component.
 */
interface HyperlinkToolbarButtonProps {

}

/**
 * Shows a toolbar button for creating or editing an hyperlink.
 *
 * @constructor
 */
export const HyperlinkToolbarButton = (props: HyperlinkToolbarButtonProps) => {
    const editor = useSlate();
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [href, setHref] = useState<string>('')
    const [title, setTitle] = useState<string>('Link')

    /**
     * Called if the popover holding the form values should be closed.
     * Closes the popover.
     */
    const onClosePopover = () => {
        setShowPopover(false);
    }

    /**
     * Called if the user clicks the button.
     * Opens the Popover for the hyperlink form values.
     */
    const onClickToolbarButton = () => {
        setShowPopover(!showPopover);
    }

    /**
     * Called if the title of the link was changed.
     * Updates the value to the state.
     *
     * @param event
     */
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    /**
     * Called if the link was changed.
     * Updates the value to the state.
     *
     * @param event
     */
    const onChangeHref = (event: ChangeEvent<HTMLInputElement>) => {
        setHref(event.target.value);
    }

    /**
     * Called if the user submits the data.
     * Inserts the link having the specified title and href.
     */
    const onClickSubmit = () => {
        if (!HyperLinkHelper.onUpsert) return;

        HyperLinkHelper.onUpsert(editor, { href: href, children: [{ text: title }] })
    }

    /**
     * Returns whether the current selected element is a hyperlink.
     */
    const isHyperlink = useMemo(() => {
        return SlateUtils.isChildOf(editor, 'hyperlink');
    }, [editor.selection]);

    /**
     * Called if the user clicks the remove button.
     * Removes the hyperlink if the current selection is a hyperlink.
     */
    const onClickRemove = () => {
        HyperLinkHelper.toggle(editor)
    }

    return (
        <div className={styles.container}>
            <ToolbarButton onClick={onClickToolbarButton} icon='hyperlink' />
            { showPopover && (
                    <Popover onClose={onClosePopover} align='top-right'>
                        <div className={formStyles.container}>
                            <div className={formStyles.group}>
                                <label>Title</label>
                                <input value={title} onChange={onChangeTitle}/>
                            </div>

                            <div className={formStyles.group}>
                                <label>Url</label>
                                <input value={href} onChange={onChangeHref} className={styles.hrefInput}/>
                            </div>

                            <div className={formStyles.buttonsContainer}>
                                { isHyperlink && <Button type='danger' onClick={onClickRemove}>Remove</Button> }
                                <Button type='primary' onClick={onClickSubmit}>Insert</Button>
                            </div>
                        </div>
                    </Popover>
            )}
        </div>
    )
}