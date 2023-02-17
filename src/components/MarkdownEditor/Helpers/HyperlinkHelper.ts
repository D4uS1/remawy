import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';
import { CustomElement } from '../Types/CustomElement';
import { SlateUtils } from '../Utils/SlateUtils';

/**
 * Returns whether the Hyperlink is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'hyperlink');
};

/**
 * Toggles the rendering of the Hyperlink in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.toggleInlineNode(editor, 'hyperlink');
};

/**
 * Inserts a hyperlink having the specified props at the current cursors position, or updates
 * the hyperluink at the current cursor position, if it already exists.
 *
 * @param editor
 * @param props
 */
const onUpsert = (editor: CustomEditor, props: Partial<CustomElement>) => {
    if (!SlateUtils.isChildOf(editor, 'hyperlink')) {
        return SlateUtils.wrapNode(editor, 'hyperlink', props);
    }

    // update the href at the nearest hyperlink, if the current cursor is already in some link
    SlateUtils.changeNearestNodeProps(editor, 'hyperlink', props);
};

export const HyperlinkHelper: CustomHelper = {
    active: active,
    toggle: toggle,
    onUpsert: onUpsert
};
