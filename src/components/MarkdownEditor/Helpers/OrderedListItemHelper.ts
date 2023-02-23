import { CustomHelper, ToggleOptions } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { KeyboardEvent } from 'react';
import { HelperUtils } from '../Utils/HelperUtils';

/**
 * Returns whether the ListItemElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'ordered-list-item');
};

/**
 * Toggles the rendering of the ListItemElement in the specified editor.
 *
 * @param editor
 * @param options
 */
const toggle = (editor: CustomEditor, options?: ToggleOptions) => {
    HelperUtils.toggleListItem(editor, 'ordered-list', options);
};

/**
 * Called if the user presses tab in a list-item element.
 * Forces the list to get into a sub list, to enable indent behavior.
 *
 * @param editor
 * @param event
 */
const onTab = (editor: CustomEditor, event: KeyboardEvent) => {
    HelperUtils.onTabListItem(editor, 'ordered-list', event);
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
    HelperUtils.onEnterListItem(editor, 'ordered-list', event);
};

export const OrderedListItemHelper: CustomHelper = {
    elementType: 'ordered-list-item',
    shortcutRegex: /^\d+\.$/,
    isVoid: false,
    isInline: false,
    active: active,
    toggle: toggle,
    onTab: onTab,
    onEnter: onEnter
};
