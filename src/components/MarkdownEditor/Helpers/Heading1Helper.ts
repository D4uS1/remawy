import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';
import { KeyboardEvent } from 'react';
import { SlateUtils } from '../Utils/SlateUtils';

/**
 * Returns whether the Heading1Element is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'heading-1');
};

/**
 * Toggles the rendering of the Heading1Element in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    console.log("Toggle heading-1");
    HelperUtils.toggleAtRoot(editor, 'heading-1');
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

export const Heading1Helper: CustomHelper = {
    active: active,
    toggle: toggle,
    onEnter: onEnter
};
