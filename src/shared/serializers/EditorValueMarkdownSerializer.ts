import { EditorValue } from '../../components';
import { Descendant } from 'slate';
import { CustomElement, CustomElementType } from '../../components/MarkdownEditor/Types/CustomElement';
import { SlateUtils } from '../../components/MarkdownEditor/Utils/SlateUtils';
import { CustomText } from '../../components/MarkdownEditor/Types/CustomText';

/**
 * Returns the number of elementTypes having the specified targetType in the elementTypes array.
 *
 * @param elementTypes
 * @param targetType
 */
const elementTypesCount = (elementTypes: CustomElementType[], targetType: CustomElementType) => {
    return elementTypes.filter((elementType) => elementType === targetType).length;
};

/**
 * Returns the number of indents as text.
 *
 * @param num
 */
const getIndentsText = (num: number): string => {
    return Array(num * 4).join(' ');
};

/**
 * Returns the markdown of the specified value that is expected to be a leaf.
 */
const serializeLeaf = (value: CustomText): string => {
    if (!value.text) return '';

    let text = value.text;
    if (value.bold) {
        text = `**${text}**`;
    }

    if (value.italic) {
        text = `*${text}*`;
    }

    return text;
};

/**
 * value is the element to render and parents is a list of element types this element is located in.
 */
type CustomElementSerializerFunc = (value: CustomElement, parents: CustomElementType[]) => string;

/**
 * Maps the elements to its serializer functions.
 */
const serializers: Record<CustomElementType, CustomElementSerializerFunc> = {
    blockquote: (value: CustomElement, parents: CustomElementType[]) => {
        return ``;
    },
    code: (value: CustomElement, parents: CustomElementType[]) => {
        return `\`\`\`\n${serializeChildren(value.children, [...parents, 'code'])}\n\`\`\``;
    },
    'heading-1': (value: CustomElement, parents: CustomElementType[]) => {
        return `# ${serializeChildren(value.children, [...parents, 'heading-1'])}`;
    },
    'heading-2': (value: CustomElement, parents: CustomElementType[]) => {
        return `## ${serializeChildren(value.children, [...parents, 'heading-2'])}`;
    },
    'heading-3': (value: CustomElement, parents: CustomElementType[]) => {
        return `### ${serializeChildren(value.children, [...parents, 'heading-3'])}`;
    },
    'heading-4': (value: CustomElement, parents: CustomElementType[]) => {
        return `#### ${serializeChildren(value.children, [...parents, 'heading-4'])}`;
    },
    'heading-5': (value: CustomElement, parents: CustomElementType[]) => {
        return `##### ${serializeChildren(value.children, [...parents, 'heading-5'])}`;
    },
    'heading-6': (value: CustomElement, parents: CustomElementType[]) => {
        return `###### ${serializeChildren(value.children, [...parents, 'heading-6'])}`;
    },
    hyperlink: (value: CustomElement, parents: CustomElementType[]) => {
        return `[${serializeChildren(value.children, [...parents, 'hyperlink'])}](${value.href || ''})`;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    image: (value: CustomElement, parents: CustomElementType[]) => {
        return `![${value.altText || ''}](${value.src || ''})`;
    },
    'ordered-list': (value: CustomElement, parents: CustomElementType[]) => {
        return serializeChildren(value.children, [...parents, 'ordered-list']);
    },
    'ordered-list-item': (value: CustomElement, parents: CustomElementType[]) => {
        const listsCount = elementTypesCount(parents, 'ordered-list');

        let result = getIndentsText(listsCount - 1);
        result = `${result}1. ${serializeChildren(value.children, [...parents, 'ordered-list-item'])}\n`;

        return result;
    },
    paragraph: (value: CustomElement, parents: CustomElementType[]) => {
        return `${serializeChildren(value.children, [...parents, 'paragraph'])}\n`;
    },
    'unordered-list': (value: CustomElement, parents: CustomElementType[]) => {
        return serializeChildren(value.children, [...parents, 'unordered-list']);
    },
    'unordered-list-item': (value: CustomElement, parents: CustomElementType[]) => {
        const listsCount = elementTypesCount(parents, 'unordered-list');

        let result = getIndentsText(listsCount - 1);
        result = `${result}* ${serializeChildren(value.children, [...parents, 'unordered-list-item'])}\n`;

        return result;
    }
};

/**
 * Serializes the specified element or leaf to markdown.
 * Parents are all the parents element types the element is located in from the rot to the element itself.
 *
 * @param element
 * @param parents
 */
const serializeElementOrLeaf = (element: CustomElement | CustomText, parents: CustomElementType[]): string => {
    if (SlateUtils.isLeaf(element)) {
        return serializeLeaf(element as CustomText);
    }

    const customElement: CustomElement = element as CustomElement;
    if (!customElement['type']) return '';

    const func: CustomElementSerializerFunc = serializers[customElement.type];
    if (!func) return '';

    return func(customElement, parents);
};

/**
 * Serializes the specified children to markdown. If joinValue is given, the children will be connected
 * using this value.
 * Parents are the element types all the parents from the root to the element that contains the children.
 *
 * @param children
 * @param parents
 * @param joinValue
 */
const serializeChildren = (
    children: Descendant[] | undefined,
    parents: CustomElementType[],
    joinValue = ''
): string => {
    if (!children) return '';

    return children?.map((child) => serializeElementOrLeaf(child, parents)).join(joinValue);
};

/**
 * Returns the markdown serialized from the specified editorValue.
 *
 * @param editorValue
 */
export const toMarkdown = (editorValue: EditorValue): string => {
    const result = serializeChildren(editorValue, [], '\n');
    console.log('serialized value', result);
    return result;
};
