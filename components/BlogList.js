const BlogList = ({ posts }) => {
    const reformatDate = (fullDate) => {
        const date = new Date(fullDate);
        return date.toDateString().slice(4);
    };

    const isPublicPost = (post) => !post.slug.startsWith("_");

    const renderPost = (post) => (
        <div key={post.slug} className="blog__list__post">
            <p className="blog__list__post__date">
                {reformatDate(post.frontmatter.date)}
            </p>
            <a href={`/posts/${post.slug}`}>{post.frontmatter.title}</a>
        </div>
    );

    return (
        <div>
            {posts.length > 0 &&
                posts
                    .filter(isPublicPost)
                    // Ternary operator is used to fix chromium sorting
                    // See: https://stackoverflow.com/a/36507611
                    .sort((a, b) =>
                        a.frontmatter.date < b.frontmatter.date ? 1 : -1
                    )
                    .map(renderPost)}
        </div>
    );
};

export default BlogList;
