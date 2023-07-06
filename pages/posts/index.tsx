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

	const renderRandomButton = () => {
		const randomIndex = Math.floor(Math.random() * filteredPosts.length);
		const randomPost = filteredPosts[randomIndex];
		const randomUrl = `/posts/${randomPost?.slug}`;
		return (
			<p>
				<a
					href={randomUrl}
					onClick={() => window.plausible("random_post_clicked")}
				>
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
	const posts = await getPublishedPosts();

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
