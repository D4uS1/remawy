import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
/**
 * Defines the editor that is used inside helpers and the editor component.
 */
export type CustomEditor = BaseEditor & ReactEditor;
