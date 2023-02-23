import React, { ReactNode, useContext } from 'react';
import styles from './Form.module.css';
import { FormGroup } from '../FormGroup/FormGroup';
import { FormLabel } from '../FormLabel/FormLabel';
import { CustomStyle, CustomStyleContext } from '../../contexts/CustomStyle/Context';
import { FormInput } from '../FormInput/FormInput';
import { FormError } from '../FormError/FormError';
import { FormButtonGroup } from '../FormButtonGroup/FormButtonGroup';
import { FormButton } from '../FormButton/FormButton';

/**
 * Props for the Form component.
 */
interface FormProps {
    // The content shown in the form
    children: ReactNode;
}

/**
 * Container class for forms.
 * Holds the content provided by the children.
 *
 * @constructor
 */
export const Form = (props: FormProps) => {
    const customStyle = useContext<CustomStyle | undefined>(CustomStyleContext);

    return (
        <form className={`${styles.container} ${customStyle?.forms?.containerClassName || ''}`}>{props.children}</form>
    );
};

Form.Group = FormGroup;
Form.Label = FormLabel;
Form.Input = FormInput;
Form.Error = FormError;
Form.ButtonGroup = FormButtonGroup;
Form.Button = FormButton;
