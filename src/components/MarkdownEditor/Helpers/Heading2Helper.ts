import {CustomHelper} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";

/**
 * Returns whether the Heading2Element is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n => (n as Element).type === 'heading-2',
    })

    return !!match;
}

/**
 * Toggles the rendering of the Heading2Element in the specified editor.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    const isActive = active(editor);

    Transforms.setNodes(
        editor,
        { type: isActive ? 'paragraph' : 'heading-2' },
        { match: n => Editor.isBlock(editor, n) }
    )
}

export const Heading2Helper: CustomHelper = {
    active: active,
    toggle: toggle
}