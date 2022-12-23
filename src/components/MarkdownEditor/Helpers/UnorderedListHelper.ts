import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';

/**
 * Returns whether the UnorderedListElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'unordered-list');
};

/**
 * Toggles the rendering of the UnorderedListElement in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.defaultToggle(editor, 'unordered-list');
};

export const UnorderedListHelper: CustomHelper = {
    active: active,
    toggle: toggle
};
