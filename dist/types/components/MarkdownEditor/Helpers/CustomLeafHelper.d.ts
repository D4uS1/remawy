import { CustomEditor } from '../Types/CustomEditor';
import { Editor, Point } from 'slate';
import { KeyboardEvent } from 'react';
export declare const CustomLeafHelper: {
    isBoldActive: (editor: CustomEditor) => boolean;
    isItalicActive: (editor: CustomEditor) => boolean;
    toggleBold: (editor: CustomEditor) => void;
    toggleItalic: (editor: CustomEditor) => void;
    setBold: (editor: CustomEditor, range?: {
        anchor: Point;
        focus: Point;
    }) => void;
    setItalic: (editor: CustomEditor, range?: {
        anchor: Point;
        focus: Point;
    }) => void;
    unsetBold: (editor: CustomEditor) => void;
    unsetItalic: (editor: CustomEditor) => void;
    handleBoldAndItalic: (editor: Editor, event: KeyboardEvent<HTMLDivElement>) => void;
};
