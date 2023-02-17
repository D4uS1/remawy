import { CustomHelper } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';
import { CustomElement } from '../Types/CustomElement';
import { SlateUtils } from '../Utils/SlateUtils';

/**
 * Returns whether the Image is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'image');
};

/**
 * Toggles the rendering of the Image in the specified editor.
 * This does normally not make sence because the image has no children.
 * This method is normally only used to remove an existing image at current cursors position.
 *
 * @param editor
 */
const toggle = (editor: CustomEditor) => {
    HelperUtils.toggleAtRoot(editor, 'image');
};

/**
 * Inserts a image having the specified props at the current cursors position, or updates
 * the image at the current cursor position, if it already exists.
 *
 * @param editor
 * @param props
 */
const onUpsert = (editor: CustomEditor, props: Partial<CustomElement>) => {
    const currentElement = SlateUtils.currentElement(editor);

    // this is an error case, because there should be any element
    if (!currentElement) return;

    // Existing image needs only to be updated
    if (currentElement.type === 'image') {
        SlateUtils.changeNearestNodeProps(editor, 'image', props);

    // Create a new image at the current position
    } else {
        SlateUtils.createNewNode(editor, 'image', {
            props: props,
            voids: true
        });
    }
};

export const ImageHelper: CustomHelper = {
    active: active,
    toggle: toggle,
    onUpsert: onUpsert
};
