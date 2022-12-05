import {CustomElementName} from "../Types/CustomElement";
import {Editor, Element, Transforms} from "slate";
import {CustomEditor} from "../Types/CustomEditor";
import {SlateUtils} from "./SlateUtils";
import {KeyboardEvent} from 'react';

/**
 * Can be used by helpers to check whether the element of the specified elementType is
 * currently active in the current block of the editors cursor.
 *
 * @param editor
 * @param elementType
 */
const defaultIsActive = (editor: CustomEditor, elementType: CustomElementName): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n => (n as Element).type === elementType,
    })

    return !!match;
}

/**
 * Can be used by helpers to toggle the element at the editors current cursor between the
 * specified elementType and default paragraph.
 *
 * @param editor
 * @param elementType
 */
const defaultToggle = (editor: CustomEditor, elementType: CustomElementName): void => {
    const isActive = defaultIsActive(editor, elementType);

    Transforms.setNodes(
        editor,
        { type: isActive ? 'paragraph' : elementType },
        { match: n => Editor.isBlock(editor, n) }
    )
}

/**
 * Can be used by helpers in onEnter callbacks to create a newline in the current block if the
 * user pressed shift and enter at once. If the user did not press shift, a new paragraph at
 * root level will be created.
 *
 * @param editor
 * @param event
 */
const onEnterWithShiftLinebreak = (editor: CustomEditor, event: KeyboardEvent) => {
    if (event.shiftKey) {
        SlateUtils.createNewline(editor)
    } else {
        SlateUtils.createRootParagraph(editor)
    }

    event.preventDefault();
}

export const HelperUtils = {
    defaultIsActive: defaultIsActive,
    defaultToggle: defaultToggle,
    onEnterWithShiftLinebreak: onEnterWithShiftLinebreak
}