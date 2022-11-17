import React from 'react'

/**
 * Props for the ReMaWyProps component.
 */
export interface ReMaWyProps {
    // The current markdown
    markdown: string;

    // Called if the Markdown content was changed and submitted
    onSubmitChange: (markdown: string) => void;
}

/**
 * A react markown wysiwyg editor.
 * The current markdown is given via the props. If the markdown is changed, the callback given by the props will
 * be called.
 *
 * @param props
 * @constructor
 */
export const ReMaWy = (props: ReMaWyProps) => {
    return <div>{ props.markdown }</div>;
};
