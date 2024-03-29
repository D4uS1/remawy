import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';

/**
 * Returns whether the OrderedListElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'ordered-list');
};

/**
 * Toggles the rendering of the OrderedListElement in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.defaultToggle(editor, 'ordered-list');
};

export const OrderedListHelper: CustomHelper = {
    elementType: 'ordered-list',
    isVoid: false,
    isInline: false,
    active: active,
    toggle: toggle
};
