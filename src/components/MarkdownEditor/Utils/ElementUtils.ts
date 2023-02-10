/**
 * Converts the specified data to an object with prefixed data- keys, hence
 * the object can be used as data attributes in an element.
 *
 * @param data
 */
const toDataAttributes = (data: Record<string, string> | undefined): Record<string, string> => {
    if (!data) return {};

    const res: Record<string, string> = {};

    Object.keys(data).map((key) => {
        res[`data-${key}`] = data[key];
    });

    return res;
};

export const ElementUtils = {
    toDataAttributes: toDataAttributes
};
