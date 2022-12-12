import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Page from "../../components/Page";
import glob from "glob";
import React from "react";
import TagIcon from "../../components/TagIcon";

export default function BlogTemplate(props) {
	function reformatDate(fullDate) {
		const date = new Date(fullDate);
		return date.toDateString().slice(4);
	}

	/*
	 ** Odd fix to get build to run
	 ** It seems like on first go the props
	 ** are undefined — could be a Next bug?
	 */

	if (!props.frontmatter) return <></>;

	const addAnchorTag = ({ node, children, ...props }) => {
		const headerSlug = node.children[0].value
			.replaceAll(" ", "-")
			.toLowerCase();
		return React.createElement(node.tagName, {
			id: headerSlug,
			children: [children],
			...props,
		});
	};

	const renderTagList = () => {
		const tags = props.frontmatter.tags?.split(",").map((tag) => tag.trim());

		return (
			<p className="page__tag-list">
				<TagIcon />
				{tags.map((tag) => (
					<a href={`/posts?tags=${tag}`}>#{tag}</a>
				))}
			</p>
		);
	};

	return (
		<Page
			siteTitle="Garrit's Notes"
			title={props.frontmatter.title}
			date={reformatDate(props.frontmatter.date)}
		>
			<ReactMarkdown
				date={props.frontmatter.date}
				remarkPlugins={[gfm]}
				rehypePlugins={[rehypeRaw]}
				components={{
					h1: addAnchorTag,
					h2: addAnchorTag,
					h3: addAnchorTag,
					h4: addAnchorTag,
					h5: addAnchorTag,
					h6: addAnchorTag,
				}}
			>
				{props.markdownBody}
			</ReactMarkdown>
			<hr />
			<p>
				<a
					href={`mailto:garrit@slashdev.space?subject=Re: ${encodeURIComponent(
						props.frontmatter.title
					)}`}
				>
					Reply via E-Mail
				</a>
			</p>
			<a href="https://www.buymeacoffee.com/garrit" target="_blank">
				<img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=garrit&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
			</a>

			{props.frontmatter.tags && renderTagList()}

			<div class="shareon">
				<a class="facebook"></a>
				<a class="linkedin"></a>
				<a class="mastodon"></a>
				<a class="pocket"></a>
				<a class="reddit"></a>
				<a class="telegram"></a>
				<a class="twitter"></a>
				<a class="whatsapp"></a>
			</div>
		</Page>
	);
}

export async function getStaticProps({ ...ctx }) {
	const { post } = ctx.params;
	const content = await import(`../../content/posts/${post}.md`);
	const data = matter(content.default);

	return {
		props: {
			frontmatter: data.data,
			markdownBody: data.content,
		},
	};
}

export async function getStaticPaths() {
	//get all .md files in the posts dir
	const blogs = glob.sync("content/posts/**/*.md");

	//remove path and extension to leave filename only
	const blogSlugs = blogs.map((file) =>
		file.split("/")[2].replace(/ /g, "-").slice(0, -3).trim()
	);

	// create paths with `slug` param
	const paths = blogSlugs.map((slug) => `/posts/${slug}`);

	return {
		paths,
		fallback: false,
	};
}
