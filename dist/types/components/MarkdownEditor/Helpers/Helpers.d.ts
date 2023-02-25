import { CustomElementType } from '../Types/CustomElement';
import { CustomHelper } from '../Types/CustomHelper';
/**
 * Holds all available Helpers that can render an element.
 */
export declare const HelpersArray: CustomHelper[];
/**
 * Holds a map of { elementType: helper } to make all helpers accessible by its type more easily.
 */
declare const Helpers: Record<CustomElementType, CustomHelper>;
export { Helpers };
/**
 * Holds all available helpers rendering block elements.
 */
export declare const BlockHelpersArray: CustomHelper[];
/**
 * Holds a map of { elementType: helper } to make all block helpers accessible by its type more easily.
 */
declare const BlockHelpers: Partial<Record<CustomElementType, CustomHelper>>;
export { BlockHelpers };
/**
 * Holds all available helpers rendering inline elements.
 */
export declare const InlineHelpersArray: CustomHelper[];
/**
 * Holds a map of { elementType: helper } to make all inline helpers accessible by its type more easily.
 */
declare const InlineHelpers: Partial<Record<CustomElementType, CustomHelper>>;
export { InlineHelpers };
/**
 * Holds all available helpers rendering void elements.
 */
export declare const VoidHelpersArray: CustomHelper[];
/**
 * Holds a map of { elementType: helper } to make all inline helpers accessible by its type more easily.
 */
declare const VoidHelpers: Partial<Record<CustomElementType, CustomHelper>>;
export { VoidHelpers };
