import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';

/**
 * Returns whether the Image is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'image');
};

/**
 * Toggles the rendering of the Image in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.toggleAtRoot(editor, 'image');
};

export const ImageHelper: CustomHelper = {
    active: active,
    toggle: toggle
};
