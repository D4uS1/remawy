import { CustomElement, CustomElementType } from '../Types/CustomElement';
import { Descendant } from 'slate';
import { CustomEditor } from '../Types/CustomEditor';
import { KeyboardEvent } from 'react';
import { ToggleOptions } from '../Types/CustomHelper';
export declare const HelperUtils: {
    defaultIsActive: (editor: CustomEditor, elementType: CustomElementType) => boolean;
    defaultToggle: (editor: CustomEditor, elementType: CustomElementType) => void;
    toggleInlineNode: (editor: CustomEditor, elementType: CustomElementType, props?: Partial<CustomElement>, defaultChildren?: Descendant[]) => void;
    toggleAtRoot: (editor: CustomEditor, elementType: CustomElementType) => void;
    toggleWithListAllowed: (editor: CustomEditor, elementType: CustomElementType) => void;
    onEnterWithShiftLinebreak: (editor: CustomEditor, event: KeyboardEvent) => void;
    onEnterWithListAndNewlineAllowed: (editor: CustomEditor, event: KeyboardEvent) => void;
    toggleListItem: (editor: CustomEditor, listType: "ordered-list" | "unordered-list", options?: ToggleOptions) => void;
    onTabListItem: (editor: CustomEditor, listType: "ordered-list" | "unordered-list", event: KeyboardEvent) => void;
    onEnterListItem: (editor: CustomEditor, listType: "ordered-list" | "unordered-list", event: KeyboardEvent) => void;
};
