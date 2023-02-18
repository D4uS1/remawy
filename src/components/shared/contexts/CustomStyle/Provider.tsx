import React, { ReactNode } from 'react';
import { CustomStyle, CustomStyleContext } from './Context';

/**
 * Props for the CustomStyleContextProvider.
 */
interface CustomStyleContextProviderProps {
    // The value of the provider
    value: CustomStyle | undefined;

    // The children that can access the context value
    children: ReactNode;
}

/**
 * Context provider for the CustomStyle value.
 */
export const CustomStyleContextProvider = (props: CustomStyleContextProviderProps) => {
    return <CustomStyleContext.Provider value={props.value}>{props.children}</CustomStyleContext.Provider>;
};
