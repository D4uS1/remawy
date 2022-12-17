import {CustomElementName} from "../Types/CustomElement";
import {Editor, Element} from "slate";
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

    if (isActive) {
        SlateUtils.changeCurrentNodeType(editor, 'paragraph')
    } else {
        SlateUtils.changeCurrentNodeType(editor, elementType);
    }
}

/**
 * Can be used by helpers to toggle the element at the editors current cursor between the
 * specified elementType and default paragraph.
 * The element is expected to be only allowed at the root, meaing the element must not be in a list or
 * some other element.
 *
 * @param editor
 * @param elementType
 */
const toggleAtRoot = (editor: CustomEditor, elementType: CustomElementName): void => {
    const isActive = defaultIsActive(editor, elementType);

    // Not active, first get to root and then set element
    if (!isActive) {
        SlateUtils.liftToRoot(editor);

        return SlateUtils.changeCurrentNodeType(editor, elementType);
    }

    // Active should be only in root, hence we can deactivate it by setting only to paragraph
    SlateUtils.changeCurrentNodeType(editor, 'paragraph');
}

/**
 * Can be used by helpers to toggle the element at the editors current cursor between the
 * specified elementType and default paragraph.
 * The element is expected to be allowed in list items, meaning that lists can be used to eg. indent the element.
 *
 * @param editor
 * @param elementType
 */
const toggleWithListAllowed = (editor: CustomEditor, elementType: CustomElementName) => {
    const isActive = defaultIsActive(editor, elementType);
    const isInList = SlateUtils.isChildOf(editor, 'list-item')

    if (isActive && isInList) {
        return SlateUtils.unwrapLeaf(editor)
    } else if (isActive && !isInList) {
        return SlateUtils.changeCurrentNodeType(editor, 'paragraph');
    }

    SlateUtils.changeCurrentNodeType(editor, elementType);

    if (!isInList) return;

    SlateUtils.wrapNode(editor, 'list-item');
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

/**
 * Can be used by helpers in onEnter callbacks for elements that are allowed to be in lists.
 * If the element is in a list, the element will be unwrapped to disable it for the next list item.
 * If the element is not in a list, the default onEnter action will be executed that allows pressing shift
 * for only newline.
 *
 * @param editor
 * @param event
 */
const onEnterWithListAndNewlineAllowed = (editor: CustomEditor, event: KeyboardEvent) => {
    const isInList = SlateUtils.isChildOf(editor, 'list-item')

    // If the item is not in a list, do the default behavior
    // If shiftKey is pressed we just want to have a newline, that is also handled in the default function
    if (!isInList || event.shiftKey) {
        return onEnterWithShiftLinebreak(editor, event);
    }

    // If the node is in a list and shift is not pressed
    if (isInList) {
        SlateUtils.createNewNodeOfCurrentType(editor);

        SlateUtils.changeCurrentNodeType(editor, 'list-item');

        return event.preventDefault();
    }

    onEnterWithShiftLinebreak(editor, event);
}

export const HelperUtils = {
    defaultIsActive: defaultIsActive,
    defaultToggle: defaultToggle,
    toggleAtRoot: toggleAtRoot,
    toggleWithListAllowed: toggleWithListAllowed,
    onEnterWithShiftLinebreak: onEnterWithShiftLinebreak,
    onEnterWithListAndNewlineAllowed: onEnterWithListAndNewlineAllowed
}