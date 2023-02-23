import { CustomHelper, ToggleOptions } from '../Types/CustomHelper';
import { CustomEditor } from '../Types/CustomEditor';
import { HelperUtils } from '../Utils/HelperUtils';
import { CustomElement } from '../Types/CustomElement';
import { SlateUtils } from '../Utils/SlateUtils';

/**
 * Returns whether the Hyperlink is currently active in the specified editor.
 *
 * @param editor
 */
const active = (editor: CustomEditor): boolean => {
    return HelperUtils.defaultIsActive(editor, 'hyperlink');
};

/**
 * Toggles the rendering of the Hyperlink in the specified editor.
 *
 * @param editor
 * @param options
 * @param props
 */
const toggle = (editor: CustomEditor, options?: ToggleOptions, props?: Partial<CustomElement>) => {
    if (options?.actor == 'shortcut' && options.actorShortcutMatch) {
        if (options.actorShortcutMatch.length < 3) return;

        const linkText = options.actorShortcutMatch[1];
        const href = options.actorShortcutMatch[2];

        SlateUtils.createNewNode(editor, 'hyperlink', {
            children: [{ text: linkText }],
            props: { href: href },
            createFollowingText: ' '
        });
    } else {
        HelperUtils.toggleInlineNode(editor, 'hyperlink', props, [{ text: 'Link' }]);
    }
};

/**
 * Inserts a hyperlink having the specified props at the current cursors position, or updates
 * the hyperluink at the current cursor position, if it already exists.
 *
 * @param editor
 * @param props
 */
const onUpsert = (editor: CustomEditor, props: Partial<CustomElement>) => {
    if (!SlateUtils.isChildOf(editor, 'hyperlink')) {
        // If there is text selected, but no hyperlink, just "toggle" the hyperlink by wrapping the seletced content into it
        if (SlateUtils.isSelection(editor)) {
            return SlateUtils.wrapNode(editor, 'hyperlink', props);

            // If there is no text selected, but no hyperlink, create a new one to prevent the whole block from being toggled
        } else {
            return SlateUtils.createNewNode(editor, 'hyperlink', {
                children: props.children,
                props: props,
                voids: true,
                createFollowingText: ' '
            });
        }
    }

    // update the href at the nearest hyperlink, if the current cursor is already in some link
    SlateUtils.changeNearestNodeProps(editor, 'hyperlink', props);
};

export const HyperlinkHelper: CustomHelper = {
    elementType: 'hyperlink',
    shortcutRegex: /\[(.+)]\((.+)\)$/,
    isVoid: false,
    isInline: true,
    active: active,
    toggle: toggle,
    onUpsert: onUpsert
};
