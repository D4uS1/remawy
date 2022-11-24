import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";

/**
 * Returns whether the BoldElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n => (n as Element).type === 'bold',
    })

    return !!match;
}

/**
 * Toggles the rendering of the BoldElement in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    const isActive = active(editor);

    Transforms.setNodes(
        editor,
        { type: isActive ? 'paragraph' : 'bold' },
        { match: n => Editor.isBlock(editor, n) }
    )
}

export const BoldHelper: CustomHelper = {
    active: active,
    toggle: toggle
}