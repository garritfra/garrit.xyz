import { Post } from "../lib/posts";

const BlogList = ({ posts }) => {
	const isPublicPost = (post: Post) => !post.slug.startsWith("_");
	const publicPosts = posts.filter(isPublicPost);

	const reformatDate = (fullDate: string) => {
		const date = new Date(fullDate);
		return date.toDateString().slice(4);
	};

	const renderPost = (post: Post) => (
		<div key={post.slug} className="blog__list__post">
			<time className="blog__list__post__date">
				{reformatDate(post.frontmatter.date)}
			</time>
			<br />
			<a href={`/posts/${post.slug}`}>{post.frontmatter.title}</a>
		</div>
	);

	return (
		<>
			<div>
				{publicPosts.length > 0 &&
					publicPosts.filter(isPublicPost).map(renderPost)}
			</div>
		</>
	);
};

export default BlogList;
