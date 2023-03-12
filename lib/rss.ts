import { getPosts, Post } from "./posts";

import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";

import xmlFormat from "xml-formatter";
import rfc822Date from "rfc822-date";
import { markdown } from "markdown";
import { getAllTags } from "./tags";

const buildRss = async () => {
	const posts = await getPosts();

	const getRssXml = (blogPosts) => {
		const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
		return `<?xml version="1.0" ?>
<rss version="2.0">
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
	<link>
		https://garrit.xyz/posts/${post.slug}?utm_source=rss
	</link>

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
