import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";

/**
 * Returns whether the ParagraphElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n => (n as Element).type === 'paragraph',
    })

    return !!match;
}

/**
 * Toggles the rendering of the ParagraphElement in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    const isActive = active(editor);

    Transforms.setNodes(
        editor,
        { type: 'paragraph' },
        { match: n => Editor.isBlock(editor, n) }
    )
}

export const ParagraphHelper: CustomHelper = {
    active: active,
    toggle: toggle
}