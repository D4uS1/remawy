import {CustomHelper, ToggleOptions} from "../Types/CustomHelper";
import {CustomEditor} from "../Types/CustomEditor";
import {Editor, Element, Transforms} from "slate";
import {SlateUtils} from "../Utils/SlateUtils";
import {KeyboardEvent} from 'react';

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
    } else if (options?.actor === 'shortcut' && /^\d+\.$/.test(options?.actorShortcut || '')) {
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

/**
 * Called if the user presses tab in a list-item element.
 * Forces the list to get into a sub list, to enable indent behavior.
 *
 * @param editor
 * @param event
 */
const onTab = (editor: CustomEditor, event: KeyboardEvent) => {

    // if shift is pressed, the list current list should be unintended
    if (event.shiftKey) {
        Transforms.liftNodes(editor);

        // If the parent is no list (after lifting), convert it to paragraph
        // If the parentElement is null, it is assumed that the parent element is the root node, hence
        // we want to convert it back here, too
        const parentElement = SlateUtils.parentElement(editor);
        if (!parentElement || !['ordered-list', 'unordered-list'].includes(parentElement.type)) {
            Transforms.setNodes(editor, { type: 'paragraph' })
        }

        // if shift is not pressed, the list should be intended
    } else {
        const parentElement = SlateUtils.parentElement(editor);
        const currentElement = SlateUtils.currentElement(editor);
        if (!currentElement || !parentElement ) { return; }

        if (parentElement.type === 'ordered-list') {
            Transforms.wrapNodes(editor, { type: 'ordered-list', children: [] })
        } else if (parentElement.type === 'unordered-list') {
            Transforms.wrapNodes(editor, { type: 'unordered-list', children: [] })
        }
    }
}

export const ListItemHelper: CustomHelper = {
    active: active,
    toggle: toggle,
    onTab: onTab
}