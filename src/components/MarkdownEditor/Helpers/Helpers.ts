import { CustomElementType } from '../Types/CustomElement';
import { CustomHelper } from '../Types/CustomHelper';
import { BlockquoteHelper } from './BlockquoteHelper';
import { CodeHelper } from './CodeHelper';
import { Heading1Helper } from './Heading1Helper';
import { Heading2Helper } from './Heading2Helper';
import { Heading3Helper } from './Heading3Helper';
import { Heading4Helper } from './Heading4Helper';
import { Heading5Helper } from './Heading5Helper';
import { Heading6Helper } from './Heading6Helper';
import { ListItemHelper } from './ListItemHelper';
import { OrderedListHelper } from './OrderedListHelper';
import { ParagraphHelper } from './ParagraphHelper';
import { UnorderedListHelper } from './UnorderedListHelper';
import { HyperlinkHelper } from './HyperlinkHelper';
import { ImageHelper } from './ImageHelper';

/**
 * Holds all available Helpers that can render an element.
 */
export const HelpersArray: CustomHelper[] = [
    BlockquoteHelper,
    CodeHelper,
    Heading1Helper,
    Heading2Helper,
    Heading3Helper,
    Heading4Helper,
    Heading5Helper,
    Heading6Helper,

    // image helper needs to be before hyperlink helper, because the shortcut of hyperlink is a subset of the shortcut of image
    ImageHelper,
    HyperlinkHelper,

    ListItemHelper,
    OrderedListHelper,
    ParagraphHelper,
    UnorderedListHelper
];

/**
 * Holds a map of { elementType: helper } to make all helpers accessible by its type more easily.
 */
// @ts-ignore all helpers are defined in the HelpersArray, hence we have all values available here
const Helpers: Record<CustomElementType, CustomHelper> = {};

HelpersArray.forEach((helper) => {
    Helpers[helper.elementType] = helper;
});

export { Helpers };

/**
 * Holds all available helpers rendering block elements.
 */
export const BlockHelpersArray: CustomHelper[] = HelpersArray.filter((helper) => !helper.isInline);

/**
 * Holds a map of { elementType: helper } to make all block helpers accessible by its type more easily.
 */
const BlockHelpers: Partial<Record<CustomElementType, CustomHelper>> = {};

BlockHelpersArray.forEach((helper) => {
    BlockHelpers[helper.elementType] = helper;
});

export { BlockHelpers };

/**
 * Holds all available helpers rendering inline elements.
 */
export const InlineHelpersArray: CustomHelper[] = HelpersArray.filter((helper) => helper.isInline);

/**
 * Holds a map of { elementType: helper } to make all inline helpers accessible by its type more easily.
 */
const InlineHelpers: Partial<Record<CustomElementType, CustomHelper>> = {};

InlineHelpersArray.forEach((helper) => {
    InlineHelpers[helper.elementType] = helper;
});

export { InlineHelpers };

/**
 * Holds all available helpers rendering void elements.
 */
export const VoidHelpersArray: CustomHelper[] = HelpersArray.filter((helper) => helper.isVoid);

/**
 * Holds a map of { elementType: helper } to make all inline helpers accessible by its type more easily.
 */
const VoidHelpers: Partial<Record<CustomElementType, CustomHelper>> = {};

VoidHelpersArray.forEach((helper) => {
    VoidHelpers[helper.elementType] = helper;
});

export { VoidHelpers };
