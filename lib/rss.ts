import { getPublishedPosts, Post } from "./posts";

import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";

import xmlFormat from "xml-formatter";
import rfc822Date from "rfc822-date";
import { markdown } from "markdown";
import { getAllTags } from "./tags";

const NUMBER_OF_POSTS_PER_FEED = 10;

const buildRss = async () => {
	const posts = await getPublishedPosts(true);

	const getRssXml = (blogPosts) => {
		const reducedPosts = blogPosts.slice(0, NUMBER_OF_POSTS_PER_FEED);

		const { rssItemsXml, latestPostDate } = blogPostsRssXml(reducedPosts);
		return `<?xml version="1.0" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>garrit.xyz</title>
		<link>https://garrit.xyz</link>
		<description>Garrit Franke</description>
		<language>en</language>
		<lastBuildDate>${rfc822Date(new Date(latestPostDate))}</lastBuildDate>
		${rssItemsXml}
	</channel>
</rss>`;
	};

	const blogPostsRssXml = (blogPosts) => {
		let latestPostDate = "";
		let rssItemsXml = "";
		blogPosts.forEach((post: Post) => {
			const postDate = Date.parse(post.frontmatter.date);
			if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
				latestPostDate = post.frontmatter.date;
			}
			rssItemsXml += `
<item>
	<title>${post.frontmatter.title}</title>
	<guid>https://garrit.xyz/posts/${post.slug}</guid>
	<link>https://garrit.xyz/posts/${post.slug}?utm_source=rss</link>
	<pubDate>${rfc822Date(new Date(postDate))}</pubDate>
	<description>
	<![CDATA[${markdown.toHTML(post.markdownBody)}]]>
	</description>
</item>`;
		});
		return {
			rssItemsXml,
			latestPostDate,
		};
	};

	const feedPath = path.join(__dirname, "../public/rss.xml");
	await fs.writeFile(feedPath, xmlFormat(getRssXml(posts)), { flag: "w" });

	const feedsDir = path.join(__dirname, "../public/feeds");

	if (!existsSync(feedsDir)) {
		await fs.mkdir(feedsDir);
	}

	const tags = (await getAllTags()).map(({ tag }) => tag);

	tags.forEach(async (tag) => {
		const feedPath = path.join(feedsDir, `${tag}.xml`);

		const postsMatchingTags = posts.filter((post) => post.tags.includes(tag));

		await fs.writeFile(feedPath, xmlFormat(getRssXml(postsMatchingTags)), {
			flag: "w",
		});
	});
};

buildRss();
