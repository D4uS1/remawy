import React, { useContext } from 'react';
import styles from './Toolbar.module.css';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';
import { UnorderedListHelper } from '../Helpers/UnorderedListHelper';
import { OrderedListHelper } from '../Helpers/OrderedListHelper';
import { BlockquoteHelper } from '../Helpers/BlockquoteHelper';
import { CodeHelper } from '../Helpers/CodeHelper';
import { Helpers } from '../Helpers/Helpers';
import { CustomLeafHelper } from '../Helpers/CustomLeafHelper';
import { ListItemHelper } from '../Helpers/ListItemHelper';
import { ToolbarButtonSpacer } from '../ToolbarButtonSpacer/ToolbarButtonSpacer';
import { Heading1Helper } from '../Helpers/Heading1Helper';
import { Heading2Helper } from '../Helpers/Heading2Helper';
import { Heading3Helper } from '../Helpers/Heading3Helper';
import { Heading4Helper } from '../Helpers/Heading4Helper';
import { Heading5Helper } from '../Helpers/Heading5Helper';
import { Heading6Helper } from '../Helpers/Heading6Helper';
import { useSlate } from 'slate-react';
import { HyperlinkToolbarButton } from '../HyperlinkToolbarButton/HyperlinkToolbarButton';
import { HyperlinkHelper } from '../Helpers/HyperlinkHelper';
import { ImageToolbarButton } from '../ImageToolbarButton/ImageToolbarButton';
import { CustomStyle, CustomStyleContext } from '../../shared/contexts/CustomStyle/Context';

/**
 * Props for the ToolBar component.
 */
interface ToolbarProps {
    // Called if the user wants to upload some file, should open the upload modal. The accept parameter are
    // comma separated mime types. If not given, everything will be accepted.
    // If forceAttachment is set to true, the result should be an a href targeting
    // the uploaded file instead of rendered content like images.
    onUploadRequest?: (accept?: string, forceAttachment?: boolean) => void;
}

/**
 * Shows a toolbar for the editor.
 * @param props
 * @constructor
 */
export const Toolbar = (props: ToolbarProps) => {
    const editor = useSlate();
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);

    /**
     * Called if the user clicks the button to write bold text.
     * Bolds und "unbolds" the text, if the user selected one. Otherwise
     * the following text will be written in bold.
     */
    const onClickBold = () => {
        CustomLeafHelper.toggleBold(editor);
    };

    /**
     * Called if the user clicks the button to write italic text.
     * Bolds und "unitalics" the text, if the user selected one. Otherwise
     * the following text will be written in italic.
     */
    const onClickItalic = () => {
        CustomLeafHelper.toggleItalic(editor);
    };

    /**
     * Called if the user clicks the button to create a heading.
     * The selected level is the heading size, defining the number of the html h tag.
     * If the user is currently in a heading block, it will be toggled back to a default paragraph.
     * Otherwise the blcok will be set to the heading of the specified level.
     *
     * @param level
     */
    const onClickHeading = (level: number) => {
        //@ts-ignore can not be indexed, but this will obviously work
        Helpers[`heading-${level}`].toggle(editor, { actor: 'toolbar' });
    };

    /**
     * Called if the user clicks the button to create an unordered list.
     * Sets the current block the user is located in to an unordered list, if it is not yet a list.
     * Otherwise it will be set back to paragraph.
     */
    const onClickUnorderedList = () => {
        // This is a special case because we want to have the cursor in a list item directly
        ListItemHelper.toggleUnorderedListItem(editor, { actor: 'toolbar' });
    };

    /**
     * Called if the user clicks the button to create an ordered list.
     * Sets the current block the user is located in to an ordered list, if it is not yet a list.
     * Otherwise it will be set back to paragraph.
     */
    const onClickOrderedList = () => {
        // This is a special case because we want to have the cursor in a list item directly
        ListItemHelper.toggleOrderedListItem(editor, { actor: 'toolbar' });
    };

    /**
     * Called if the user clicks the button to create a blockquote.
     * Sets the current block the user is located in to a blockquote, if it is not yet a blockquote.
     * Otherwise it will be set back to paragraph.
     */
    const onClickBlockquote = () => {
        BlockquoteHelper.toggle(editor, { actor: 'toolbar' });
    };

    /**
     * Called if the user clicks the button to create a code block.
     * Sets the current block the user is located in to a code block, if it is not yet a code block.
     * Otherwise it will be set back to paragraph.
     */
    const onClickCode = () => {
        CodeHelper.toggle(editor, { actor: 'toolbar' });
    };

    /**
     * Called if the user clicks the button to upload a file.
     * Calls the callback to open the upload dialog. The upload will be force to be shown
     * as attachment instead of rendered content.
     */
    const onClickUpload = () => {
        if (!props.onUploadRequest) return;

        props.onUploadRequest(undefined, true);
    };

    /**
     * Holds for all buttons the status if it should be shown as active.
     */
    const activeStatus: Record<string, boolean> = {
        bold: CustomLeafHelper.isBoldActive(editor),
        italic: CustomLeafHelper.isItalicActive(editor),
        'heading-1': Heading1Helper.active(editor),
        'heading-2': Heading2Helper.active(editor),
        'heading-3': Heading3Helper.active(editor),
        'heading-4': Heading4Helper.active(editor),
        'heading-5': Heading5Helper.active(editor),
        'heading-6': Heading6Helper.active(editor),
        'unordered-list': UnorderedListHelper.active(editor),
        'ordered-list': OrderedListHelper.active(editor),
        blockquote: BlockquoteHelper.active(editor),
        code: CodeHelper.active(editor),
        hyperlink: HyperlinkHelper.active(editor)
    };

    return (
        <div className={`${styles.container} ${customStyle?.toolbar?.containerClassName || ''}`}>
            <div className={styles.innerContainer}>
                {/* format options */}
                <ToolbarButton icon={'bold'} onClick={onClickBold} active={activeStatus['bold']} />
                <ToolbarButton icon={'italic'} onClick={onClickItalic} active={activeStatus['italic']} />
                <ToolbarButtonSpacer />

                {/* headings */}
                {[1, 2, 3, 4, 5, 6].map((headingLevel) => (
                    <ToolbarButton
                        key={headingLevel}
                        onClick={() => onClickHeading(headingLevel)}
                        text={`H${headingLevel}`}
                        active={activeStatus[`heading-${headingLevel}`]}
                    />
                ))}
                <ToolbarButtonSpacer />

                {/* lists */}
                <ToolbarButton
                    icon={'unordered-list'}
                    onClick={onClickUnorderedList}
                    active={activeStatus['unordered-list']}
                />
                <ToolbarButton
                    icon={'ordered-list'}
                    onClick={onClickOrderedList}
                    active={activeStatus['ordered-list']}
                />
                <ToolbarButtonSpacer />

                {/* blocks */}
                <ToolbarButton icon={'blockquote'} onClick={onClickBlockquote} active={activeStatus['blockquote']} />
                <ToolbarButton icon={'code'} onClick={onClickCode} active={activeStatus['code']} />
                <ToolbarButtonSpacer />

                {/* uploads or links */}
                <HyperlinkToolbarButton />
                <ImageToolbarButton onUploadRequest={props.onUploadRequest} />
                {props.onUploadRequest && <ToolbarButton icon={'upload'} onClick={onClickUpload} active={false} />}
            </div>
        </div>
    );
};
