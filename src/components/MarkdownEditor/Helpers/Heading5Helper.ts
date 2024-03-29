import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';
import { KeyboardEvent } from 'react';
import { SlateUtils } from '../Utils/SlateUtils';

/**
 * Returns whether the Heading5Element is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'heading-5');
};

/**
 * Toggles the rendering of the Heading5Element in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.toggleAtRoot(editor, 'heading-5');
};

/**
 * Replaces the default behavior of pressing enter.
 * Always creates a new paragraph instead of creating a new header.
 *
 * @param editor
 * @param event
 */
const onEnter = (editor: CustomEditor, event: KeyboardEvent) => {
    SlateUtils.createRootParagraph(editor);

    // prevent the default slate action from creating a new heading
    event.preventDefault();
};

export const Heading5Helper: CustomHelper = {
    elementType: 'heading-5',
    shortcutText: '#####',
    isVoid: false,
    isInline: false,
    active: active,
    toggle: toggle,
    onEnter: onEnter
};
