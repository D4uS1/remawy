import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';
import {CustomElement} from "../Types/CustomElement";
import {SlateUtils} from "../Utils/SlateUtils";

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
    SlateUtils.createNewNode(editor, 'hyperlink', {
        children: props.children || [{ text: 'Link' }],
        props: {
            href: props.href
        },
        createFollowingLeaf: true
    });
}

export const HyperLinkHelper: CustomHelper = {
    active: active,
    toggle: toggle,
    onUpsert: onUpsert
};
