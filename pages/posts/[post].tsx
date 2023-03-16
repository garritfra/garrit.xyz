import React from "react";
import matter from "gray-matter";
import glob from "glob";
import Page from "../../components/Page";
import TagIcon from "../../components/TagIcon";
import Markdown from "../../components/Markdown";

export default function BlogTemplate(props) {
	function reformatDate(fullDate: string) {
		const date = new Date(fullDate);
		return date.toDateString().slice(4);
	}

	/*
	 ** Odd fix to get build to run
	 ** It seems like on first go the props
	 ** are undefined — could be a Next bug?
	 */

	if (!props.frontmatter) return <></>;

	const renderTagList = () => {
		const tags = props.frontmatter.tags?.split(",").map((tag) => tag.trim());

		return (
			<p className="page__tag-list">
				<TagIcon />
				{tags.map((tag) => (
					<a key={tag} href={`/posts?tags=${tag}`}>
						#{tag}
					</a>
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
			<Markdown>{props.markdownBody}</Markdown>
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

			<div className="shareon">
				<a className="facebook"></a>
				<a className="linkedin"></a>
				<a className="mastodon"></a>
				<a className="pocket"></a>
				<a className="reddit"></a>
				<a className="telegram"></a>
				<a className="twitter"></a>
				<a className="whatsapp"></a>
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
	const blogs = await glob("content/posts/**/*.md");

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
