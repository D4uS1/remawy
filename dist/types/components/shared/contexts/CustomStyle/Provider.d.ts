import { ReactNode } from 'react';
import { CustomStyle } from './Context';
/**
 * Props for the CustomStyleContextProvider.
 */
interface CustomStyleContextProviderProps {
    value: CustomStyle | undefined;
    children: ReactNode;
}
/**
 * Context provider for the CustomStyle value.
 */
export declare const CustomStyleContextProvider: (props: CustomStyleContextProviderProps) => JSX.Element;
export {};
