import React from 'react';
import {CustomEditor} from "../Types/CustomEditor";
import styles from './Toolbar.module.css';
import {ToolbarButton} from "../ToolbarButton/ToolbarButton";
import {UnorderedListHelper} from "../Helpers/UnorderedListHelper";
import {OrderedListHelper} from "../Helpers/OrderedListHelper";
import {BlockquoteHelper} from "../Helpers/BlockquoteHelper";
import {CodeHelper} from "../Helpers/CodeHelper";
import {Helpers} from "../Helpers/Helpers";
import {Editor} from "slate";
import {CustomLeafHelper} from "../Helpers/CustomLeafHelper";
import {ListItemHelper} from "../Helpers/ListItemHelper";

/**
 * Props for the ToolBar component.
 */
interface ToolbarProps {
    // The current editors state
    editor: CustomEditor;
}

/**
 * Shows a toolbar for the editor.
 * @param props
 * @constructor
 */
export const Toolbar = (props: ToolbarProps) => {

    /**
     * Called if the user clicks the button to write bold text.
     * Bolds und "unbolds" the text, if the user selected one. Otherwise
     * the following text will be written in bold.
     */
    const onClickBold = () => {
        CustomLeafHelper.toggleBold(props.editor)
    }

    /**
     * Called if the user clicks the button to write italic text.
     * Bolds und "unitalics" the text, if the user selected one. Otherwise
     * the following text will be written in italic.
     */
    const onClickItalic = () => {
        CustomLeafHelper.toggleItalic(props.editor)
    }

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
        Helpers[`heading-${level}`].toggle(props.editor, { actor: 'toolbar'})
    }

    /**
     * Called if the user clicks the button to create an unordered list.
     * Sets the current block the user is located in to an unordered list, if it is not yet a list.
     * Otherwise it will be set back to paragraph.
     */
    const onClickUnorderedList = () => {
        // This is a special case because we want to have the cursor in a list item directly
        ListItemHelper.toggleUnorderedListItem(props.editor, { actor: 'toolbar' });
    }

    /**
     * Called if the user clicks the button to create an ordered list.
     * Sets the current block the user is located in to an ordered list, if it is not yet a list.
     * Otherwise it will be set back to paragraph.
     */
    const onClickOrderedList = () => {
        // This is a special case because we want to have the cursor in a list item directly
        ListItemHelper.toggleOrderedListItem(props.editor, { actor: 'toolbar' });
    }

    /**
     * Called if the user clicks the button to create a blockquote.
     * Sets the current block the user is located in to a blockquote, if it is not yet a blockquote.
     * Otherwise it will be set back to paragraph.
     */
    const onClickBlockquote = () => {
        BlockquoteHelper.toggle(props.editor, { actor: 'toolbar' });
    }

    /**
     * Called if the user clicks the button to create a code block.
     * Sets the current block the user is located in to a code block, if it is not yet a code block.
     * Otherwise it will be set back to paragraph.
     */
    const onClickCode = () => {
        CodeHelper.toggle(props.editor, { actor: 'toolbar' });
    }

    return (
        <div className={styles.container}>
            <ToolbarButton icon={'bold'} onClick={onClickBold} />
            <ToolbarButton icon={'italic'} onClick={onClickItalic} />
            <ToolbarButton icon={'unordered-list'} onClick={onClickUnorderedList} />
            <ToolbarButton icon={'ordered-list'} onClick={onClickOrderedList} />
            <ToolbarButton icon={'blockquote'} onClick={onClickBlockquote} />
            <ToolbarButton icon={'code'} onClick={onClickCode} />

            {
                [1, 2, 3, 4, 5, 6].map((headingLevel) => (
                    <ToolbarButton onClick={() => onClickHeading(headingLevel)} text={`H${headingLevel}`} />
                ))
            }
        </div>
    )
}