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
import { HyperLinkHelper } from './HyperLinkHelper';
import { ImageHelper } from './ImageHelper';

/**
 * Holds a map from element name to Helper that can be used to render the element.
 */
export const Helpers: Record<CustomElementType, CustomHelper> = {
    blockquote: BlockquoteHelper,
    code: CodeHelper,
    'heading-1': Heading1Helper,
    'heading-2': Heading2Helper,
    'heading-3': Heading3Helper,
    'heading-4': Heading4Helper,
    'heading-5': Heading5Helper,
    'heading-6': Heading6Helper,
    hyperlink: HyperLinkHelper,
    image: ImageHelper,
    'list-item': ListItemHelper,
    'ordered-list': OrderedListHelper,
    paragraph: ParagraphHelper,
    'unordered-list': UnorderedListHelper
};
