import React from 'react';
/**
 * Props for the ToolBar component.
 */
interface ToolbarProps {
    onUploadRequest?: (accept?: string, forceAttachment?: boolean) => void;
}
/**
 * Shows a toolbar for the editor.
 * @param props
 * @constructor
 */
export declare const Toolbar: (props: ToolbarProps) => React.JSX.Element;
export {};
