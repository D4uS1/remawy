import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';
import { Popover } from '../../../shared/components/Popover/Popover';
import styles from './HyperlinkToolbarButton.module.css';
import { ReactEditor, useSlate } from 'slate-react';
import { HyperlinkHelper } from '../Helpers/HyperlinkHelper';
import { SlateUtils } from '../Utils/SlateUtils';
import { Form } from '../../../shared/components/Form/Form';
import { CustomStyle, CustomStyleContext } from '../../../shared/contexts/CustomStyle/Context';

/**
 * Shows a toolbar button for creating or editing an hyperlink.
 *
 * @constructor
 */
export const HyperlinkToolbarButton = () => {
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);
    const editor = useSlate();
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [href, setHref] = useState<string>('');
    const hrefInputRef = useRef<HTMLInputElement>(null);

    /**
     * Called if the popover is shown to determine the current href value in the selection, if exists.
     * Also focuses the text field to be able to type without clicking in it.
     */
    useEffect(() => {
        if (!showPopover) return;

        // focus the textfield
        hrefInputRef.current?.focus();

        // find initial value for href
        const nearestHyperlink = SlateUtils.nearestElementOfType(editor, 'hyperlink');
        if (!nearestHyperlink || !nearestHyperlink.href) return setHref('https://niiice.io');

        setHref(nearestHyperlink.href);
    }, [showPopover, editor]);

    /**
     * Called if the popover holding the form values should be closed.
     * Closes the popover.
     */
    const onClosePopover = () => {
        setShowPopover(false);

        ReactEditor.focus(editor);
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
        if (!HyperlinkHelper.onUpsert) return;

        HyperlinkHelper.onUpsert(editor, { href: href, children: [{ text: href }] });
        onClosePopover();
    };

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
        HyperlinkHelper.toggle(editor);
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
            <ToolbarButton onClick={onClickToolbarButton} icon="hyperlink" />
            {showPopover && (
                <Popover onClose={onClosePopover} onPressEnter={onPressEnter} align="top-right">
                    <Form>
                        <Form.Group>
                            <Form.Label text={customStyle?.texts?.url || 'Url'} />
                            <Form.Input
                                ref={hrefInputRef}
                                value={href}
                                onChange={setHref}
                                className={styles.hrefInput}
                            />
                        </Form.Group>

                        <Form.ButtonGroup>
                            {isHyperlink && (
                                <Form.Button type="danger" onClick={onClickRemove}>
                                    {customStyle?.texts?.remove || 'Remove'}
                                </Form.Button>
                            )}
                            <Form.Button type="primary" onClick={onClickSubmit}>
                                {customStyle?.texts?.insert || 'Insert'}
                            </Form.Button>
                        </Form.ButtonGroup>
                    </Form>
                </Popover>
            )}
        </div>
    );
};
