import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";

/**
 * Returns whether the OrderedListElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n => (n as Element).type === 'ordered-list',
    })

    return !!match;
}

/**
 * Toggles the rendering of the OrderedListElement in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    const isActive = active(editor);

    Transforms.setNodes(
        editor,
        { type: isActive ? 'paragraph' : 'ordered-list' },
        { match: n => Editor.isBlock(editor, n) }
    )
}

export const OrderedListHelper: CustomHelper = {
    active: active,
    toggle: toggle
}