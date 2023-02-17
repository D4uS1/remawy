import { CustomHelper, CustomHelperToggleFunc, ToggleOptions } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { SlateUtils } from '../Utils/SlateUtils';
import { KeyboardEvent } from 'react';
import { HelperUtils } from '../Utils/HelperUtils';

/**
 * Returns whether the ListItemElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'list-item');
};

/**
 * Deactivates the list item at the cursor position of the editor, by setting it to paragraph
 * and removing all indents.
 *
 * @param editor
 */
const deactivateListItem = (editor: CustomEditor) => {
    // Remove lists and indented lists until we are in the "root"
    do {
        SlateUtils.unwrapNode(editor);
    } while (['ordered-list', 'unordered-list'].includes(SlateUtils.parentBlockType(editor) || ''));

    // Change the list-item element to paragraph
    SlateUtils.changeCurrentNodeType(editor, 'paragraph');
};

/**
 * Toggles the rendering of the ListItemElement in the specified editor.
 * If the listItem is not yet in an list of the specified type, it will be wrapped into one.
 *
 * @param editor
 * @param list
 * @param options
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toggleInList = (editor: CustomEditor, list: 'ordered-list' | 'unordered-list', options?: ToggleOptions) => {
    // currently we are in a list item, hence we need to deactivate it.
    if (active(editor)) {
        return deactivateListItem(editor);
    }

    if (!SlateUtils.isChildOf(editor, list)) {
        SlateUtils.wrapNode(editor, list);
    }

    SlateUtils.changeCurrentNodeType(editor, 'list-item');
};

/**
 * Toggles the rendering of the ListItemElement in the specified editor.
 * If the listItem is not yet in an orderedList, it will be wrapped into one.
 *
 * @param editor
 * @param options
 */
const toggleOrderedListItem = (editor: CustomEditor, options?: ToggleOptions) => {
    toggleInList(editor, 'ordered-list', options);
};

/**
 * Toggles the rendering of the ListItemElement in the specified editor.
 * If the listItem is not yet in an unorderedList, it will be wrapped into one.
 *
 * @param editor
 * @param options
 */
const toggleUnorderedListItem = (editor: CustomEditor, options?: ToggleOptions) => {
    toggleInList(editor, 'unordered-list', options);
};

/**
 * Toggles the rendering of the ListItemElement in the specified editor.
 *
 * @param editor
 * @param options
 */
const toggle = (editor: CustomEditor, options?: ToggleOptions) => {
    // if the list-item is not yet in a list, find the correct list to render (ordered or unordered) and
    // create a list wrapper around the item.
    if (options?.actor === 'shortcut' && options?.actorShortcut === '*') {
        toggleUnorderedListItem(editor, options);
    } else if (options?.actor === 'shortcut' && /^\d+\.$/.test(options?.actorShortcut || '')) {
        toggleOrderedListItem(editor, options);
    }
};

/**
 * Called if the user presses tab in a list-item element.
 * Forces the list to get into a sub list, to enable indent behavior.
 *
 * @param editor
 * @param event
 */
const onTab = (editor: CustomEditor, event: KeyboardEvent) => {
    // if shift is pressed, the list current list should be unintended
    if (event.shiftKey) {
        SlateUtils.unwrapNode(editor);

        // If the parent is no list (after lifting), convert it to paragraph
        // If the parentElement is null, it is assumed that the parent element is the root node, hence
        // we want to convert it back here, too
        const parentBlock = SlateUtils.parentBlock(editor);
        if (!parentBlock || !['ordered-list', 'unordered-list'].includes(parentBlock.type)) {
            SlateUtils.changeCurrentNodeType(editor, 'paragraph');
        }

        // if shift is not pressed, the list should be intended
    } else {
        const parentBlock = SlateUtils.parentBlock(editor);
        const currentBlock = SlateUtils.currentBlock(editor);
        if (!currentBlock || !parentBlock) {
            return;
        }

        if (parentBlock.type === 'ordered-list') {
            SlateUtils.wrapNode(editor, 'ordered-list');
        } else if (parentBlock.type === 'unordered-list') {
            SlateUtils.wrapNode(editor, 'unordered-list');
        }
    }

    // prevent default tab handler from being processed
    event.preventDefault();
};

/**
 * Overwrites the default behavior if the user presses enter in a list item.
 * If the curent textnode is empty, a new paragraph will be created. This should be the case if the user
 * is inside an empty list-entry.
 * Otherwise a new list entry will be created. This is done by just doing nothing, because this shoul cause slate
 * to do its default action that is creating a new list-entry.
 *
 * @param editor
 * @param event
 */
const onEnter = (editor: CustomEditor, event: KeyboardEvent) => {
    // only remove list item it enter was pressed twice
    const textSinceBlockStart = SlateUtils.textSinceBlockStart(editor);
    if (textSinceBlockStart !== '') {
        return;
    }

    deactivateListItem(editor);

    // Prevent default slate action
    event.preventDefault();
};

export const ListItemHelper: CustomHelper & {
    toggleOrderedListItem: CustomHelperToggleFunc;
    toggleUnorderedListItem: CustomHelperToggleFunc;
} = {
    active: active,
    toggle: toggle,
    toggleOrderedListItem: toggleOrderedListItem,
    toggleUnorderedListItem: toggleUnorderedListItem,
    onTab: onTab,
    onEnter: onEnter
};
