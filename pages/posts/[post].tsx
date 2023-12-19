import { glob } from "glob";
import matter from "gray-matter";
import BlogList from "../../components/BlogList";
import Markdown from "../../components/Markdown";
import Page from "../../components/Page";
import { RWebShare } from "react-web-share";
import { getPosts, getPublishedPosts, isPublicPost } from "../../lib/posts";
import { getTopicTags } from "../../lib/tags";
import { useEffect, useState } from "react";

export default function BlogTemplate(props) {
	// TODO: Can this be simplified?
	const [SSR, setSSR] = useState(true);
	useEffect(() => {
		setSSR(false);
	});

	function reformatDate(fullDate: string) {
		const date = new Date(fullDate);
		return date.toDateString().slice(4);
	}

	/*
	 ** Odd fix to get build to run
	 ** It seems like on first go the props
	 ** are undefined — could be a Next bug?
	 */

	if (!props.post.frontmatter) return <></>;

	return (
		<Page
			siteTitle="Garrit's Notes"
			title={props.post.frontmatter.title}
			date={reformatDate(props.post.frontmatter.date)}
			tags={
				props.post.frontmatter.tags &&
				props.post.frontmatter.tags?.split(",").map((tag) => tag.trim())
			}
		>
			<Markdown>{props.post.markdownBody}</Markdown>
			<hr />
			<p className="horizontal-list">
				<a
					href={`mailto:garrit@slashdev.space?subject=Re: ${encodeURIComponent(
						props.post.frontmatter.title
					)}`}
				>
					<button>💌️ Reply via E-Mail</button>
				</a>
				<RWebShare
					data={{
						text: `${props.post.frontmatter.title}\n`,
						url: !SSR && window.location.href,
						title: props.post.frontmatter.title,
					}}
					onClick={() => console.log("shared successfully!")}
				>
					<button>🔗 Share</button>
				</RWebShare>
			</p>

			<a href="https://www.buymeacoffee.com/garrit" target="_blank">
				<img src="https://img.buymeacoffee.com/button-api/?text=Buy me a tea&emoji=&slug=garrit&button_colour=FFB300&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
			</a>

			<hr />

			<h2>Continue Reading</h2>
			<BlogList posts={props.recommendedPosts} />
		</Page>
	);
}

export async function getStaticProps({ ...ctx }) {
	const { post: slug } = ctx.params;
	const content = await import(`../../content/posts/${slug}.md`);
	const data = matter(content.default);

	const allPosts = await getPosts(true);
	const publishedPosts = await getPublishedPosts(false);

	const currentPost = allPosts.find((post) => post.slug === slug);

	const relevantTags = (await getTopicTags()).map(({ tag }) => tag);

	const postsMatchingInterests = publishedPosts.filter((post) => {
		return post.tags.some(
			(tag) => relevantTags.includes(tag) && currentPost.tags.includes(tag)
		);
	});

	const recommendedPosts = postsMatchingInterests
		.filter(isPublicPost)
		.filter((post) => post.slug !== currentPost.slug)
		.slice(0, 5);

	return {
		props: {
			post: currentPost,
			recommendedPosts,
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
