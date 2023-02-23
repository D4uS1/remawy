import {EditorValue} from "../../components";
import {Descendant} from "slate";
import {CustomElement, CustomElementType} from '../../components/MarkdownEditor/Types/CustomElement';
import {CustomLeafProps} from "../../components/MarkdownEditor/Leafs/CustomLeaf";
import {SlateUtils} from "../../components/MarkdownEditor/Utils/SlateUtils";
import {CustomText} from "../../components/MarkdownEditor/Types/CustomText";

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
}

type CustomElementSerializerFunc = (value: CustomElement) => string;

/**
 * Maps the elements to its serializer functions.
 */
const serializers: Record<CustomElementType, CustomElementSerializerFunc> = {
    'blockquote': (value: CustomElement) => {
        return ``;
    },
    'code': (value: CustomElement) => {
        return `\`\`\`\n${serializeChildren(value.children)}\`\`\``;
    },
    'heading-1': (value: CustomElement) => {
        return `# ${serializeChildren(value.children)}`;
    },
    'heading-2': (value: CustomElement) => {
        return `## ${serializeChildren(value.children)}`;
    },
    'heading-3': (value: CustomElement) => {
        return `### ${serializeChildren(value.children)}`;
    },
    'heading-4': (value: CustomElement) => {
        return `#### ${serializeChildren(value.children)}`;
    },
    'heading-5': (value: CustomElement) => {
        return `##### ${serializeChildren(value.children)}`;
    },
    'heading-6': (value: CustomElement) => {
        return `###### ${serializeChildren(value.children)}`;
    },
    'hyperlink': (value: CustomElement) => {
        return `[${serializeChildren(value.children)}](${value.href || ''})`;
    },
    'image': (value: CustomElement) => {
        return `![${value.altText || ''}](${value.src || ''})`;
    },
    'list-item': (value: CustomElement) => {
        return `* ${serializeChildren(value.children)}`;
    },
    'ordered-list': (value: CustomElement) => {
        return serializeChildren(value.children);
    },
    'paragraph': (value: CustomElement) => {
        return `${serializeChildren(value.children)}\n`
    },
    'unordered-list': (value: CustomElement) => {
        return serializeChildren(value.children);
    }
}

/**
 * Serializes the specified element or leaf to markdown.
 *
 * @param element
 */
const serializeElementOrLeaf = (element: CustomElement | CustomText): string => {
    if (SlateUtils.isLeaf(element)) {
        return serializeLeaf(element as CustomText)
    }

    const customElement: CustomElement = element as CustomElement;
    if (!customElement['type']) return ''

    const func: CustomElementSerializerFunc = serializers[customElement.type];
    if (!func) return '';

    return func(customElement);
}

/**
 * Serializes the specified children to markdown. If joinValue is given, the children will be connected
 * using this value.
 *
 * @param children
 * @param joinValue
 */
const serializeChildren = (children: Descendant[] | undefined, joinValue: string = ''): string => {
    if (!children) return '';

    return children?.map(serializeElementOrLeaf).join(joinValue)
}

/**
 * Returns the markdown serialized from the specified editorValue.
 *
 * @param editorValue
 */
export const toMarkdown = (editorValue: EditorValue): string => {
    const result = serializeChildren(editorValue, "\n");
    console.log("serialized value", result)
    return result;
}