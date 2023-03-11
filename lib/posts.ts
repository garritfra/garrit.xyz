import { glob } from "glob";
import matter from "gray-matter";
import fs from "fs/promises";

export interface PostMetadata {
	date: string;
	title: string;
	tags: string;
}

export interface Post {
	slug: string;
	markdownBody: string;
	frontmatter: PostMetadata;
}

export const getPosts = async () => {
	const files = await glob("content/posts/*.md");
	const postPromises = files.map(async (filepath): Promise<Post> => {
		const slug = filepath
			.replace(/^.*[\\\/]/, "")
			.split(".")
			.slice(0, -1)
			.join(".");

		const rawContents = await fs.readFile(filepath);

		const post = matter(rawContents);

		return {
			slug,
			markdownBody: post.content,
			frontmatter: post.data as PostMetadata,
		};
	});

	return Promise.all(postPromises);
};
