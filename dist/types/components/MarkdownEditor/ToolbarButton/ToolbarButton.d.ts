import React from 'react';
/**
 * Props for the ToolbarButton component.
 */
interface ToolbarButtonProps {
    icon?: 'bold' | 'blockquote' | 'code' | 'italic' | 'ordered-list' | 'unordered-list' | 'upload' | 'hyperlink' | 'image';
    text?: string;
    active?: boolean;
    onClick: () => void;
}
/**
 * A button for the toolbar of the editor.
 *
 * @param props
 * @constructor
 */
export declare const ToolbarButton: (props: ToolbarButtonProps) => React.JSX.Element;
export {};
