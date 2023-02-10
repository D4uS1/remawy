import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';

/**
 * Returns whether the HyperLink is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'hyperlink');
};

/**
 * Toggles the rendering of the HyperLink in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.toggleAtRoot(editor, 'hyperlink');
};

export const HyperLinkHelper: CustomHelper = {
    active: active,
    toggle: toggle
};
