import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';
import { KeyboardEvent } from 'react';

/**
 * Returns whether the BlockQuoteElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'blockquote');
};

/**
 * Toggles the rendering of the BlockQuoteElement in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.toggleWithListAllowed(editor, 'blockquote');
};

/**
 * Overwrites the behavior of the editor on pressing enter in a blockuote element.
 * If the user presses shift and enter, a new line will be created.
 * If the user only presses enter, a new empty paragraph will be created.
 *
 * @param editor
 * @param event
 */
const onEnter = (editor: CustomEditor, event: KeyboardEvent) => {
    HelperUtils.onEnterWithListAndNewlineAllowed(editor, event);
};

export const BlockquoteHelper: CustomHelper = {
    elementType: 'blockquote',
    isVoid: false,
    isInline: false,
    active: active,
    toggle: toggle,
    onEnter: onEnter
};
