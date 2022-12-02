import {CustomHelper, ToggleOptions} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";
import {SlateUtils} from "../Utils/SlateUtils";

/**
 * Returns whether the ListItemElement is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n => (n as Element).type === 'list-item',
    })

    return !!match;
}

/**
 * Toggles the rendering of the ListItemElement in the specified editor.
 *
 * @param editor
 * @param options
 */
const toggle = (editor: CustomEditor, options?: ToggleOptions) => {
    const isActive = active(editor);

    // currently we are in a list item, hence we need to deactivate it.
    if (isActive) {
        Transforms.setNodes(
            editor,
            { type: 'paragraph' },
            { match: n => Editor.isBlock(editor, n) }
        )

        return;
    }

    // if the list-item is not yet in a list, find the correct list to render (ordered or unordered) and
    // create a list wrapper around the item.
    if (options?.actor === 'shortcut' && options?.actorShortcut === '*') {
        if (!SlateUtils.isChildOf(editor, 'unordered-list')) {
            Transforms.wrapNodes(editor, {type: 'unordered-list', children: []})
        }
    } else if (options?.actor === 'shortcut' && options?.actorShortcut === '.') {
        if (!SlateUtils.isChildOf(editor, 'ordered-list')) {
            Transforms.wrapNodes(editor, {type: 'ordered-list', children: []})
        }
    }

    Transforms.setNodes(
        editor,
        { type: 'list-item' },
        { match: n => Editor.isBlock(editor, n) }
    )
}

export const ListItemHelper: CustomHelper = {
    active: active,
    toggle: toggle
}