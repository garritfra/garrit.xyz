import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BlogList from "../../components/BlogList";
import Page from "../../components/Page";
import { getPublishedPosts } from "../../lib/posts";

// TODO: Move type to .d.ts
declare global {
	interface Window {
		plausible: any;
	}
}

const Index = (props) => {
	const { query } = useRouter();

	// TODO: Add support for multiple tags
	const tags = typeof query.tags === "string" ? query?.tags : query.tags?.[0];

	const filteredPosts = query.tags
		? props.posts.filter((post) =>
				post.tags
					.map((tag: string) => tag.toLowerCase())
					.includes(tags.toLowerCase())
		  )
		: props.posts;

	const getRandomPostUrl = (): string => {
		const randomIndex = Math.floor(Math.random() * filteredPosts.length);
		const randomPost = filteredPosts[randomIndex];
		return `/posts/${randomPost?.slug}`;
	};

	// We're wrapping this in a state and useEffect to ensure that we always
	// have a fallback URL, in case the user has disabled javascript. The
	// fallback URL is generated upon building the page.
	const [randomUrl, setRandomUrl] = useState(getRandomPostUrl());

	useEffect(() => {
		setRandomUrl(getRandomPostUrl());
	}, []);

	const renderRandomButton = () => {
		return (
			<p>
				<a href={randomUrl} onClick={() => setRandomUrl(getRandomPostUrl())}>
					✨ Random Post ✨
				</a>
			</p>
		);
	};

	return (
		<Page siteTitle="Garrit's Notes">
			{renderRandomButton()}
			<hr />
			<BlogList posts={filteredPosts} />
		</Page>
	);
};

export async function getStaticProps() {
	const posts = await getPublishedPosts(false);

	return {
		props: {
			posts: posts.map((post) => ({
				frontmatter: post.frontmatter,
				slug: post.slug,
				tags: post.tags,
			})),
			description: "",
		},
	};
}

export default Index;
