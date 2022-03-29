export const parseTags = (strings) => {
    const postTags = keys
        .map((key, index) => {
            const value = values[index];
            // Parse yaml metadata & markdownbody in document

            const document = matter(value.default);
            const rawTags = document.data?.tags || "";
            return rawTags.split(",").map((tag) => tag.trim());
        })
        .flat()
        .filter((value) => value !== "");
};
