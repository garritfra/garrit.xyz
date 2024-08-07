import { getPublishedPosts } from "./posts";

export interface Tag {
	tag: string;
	count: number;
}

export const getAllTags = async (): Promise<Tag[]> => {
	const posts = await getPublishedPosts(false);
	const postTags = posts.flatMap((post) => post.tags);

	const tagMap = {};

	for (const tag of postTags) {
		tagMap[tag] ? tagMap[tag]++ : (tagMap[tag] = 1);
	}

	return postTags
		.flat()
		.filter((value, index, array) => array.indexOf(value) === index) // Deduplicate
		.filter(Boolean)
		.sort()
		.map((tag) => ({ tag, count: tagMap[tag] }))
		.sort((a, b) => b.count - a.count);
};

export const getTopicTags = async () => {
	const allTags = await getAllTags();

	const nonTopicTags = ["100DaysToOffload", "note"].map((tag) =>
		tag.toLowerCase()
	);

	return allTags.filter((tag) => !nonTopicTags.includes(tag.tag.toLowerCase()));
};
