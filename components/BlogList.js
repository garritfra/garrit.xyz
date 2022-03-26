const BlogList = ({ posts }) => {
    const isPublicPost = (post) => !post.slug.startsWith("_");
    const publicPosts = posts.filter(isPublicPost);

    const reformatDate = (fullDate) => {
        const date = new Date(fullDate);
        return date.toDateString().slice(4);
    };

    const renderRandomButton = () => {
        const randomIndex = Math.floor(Math.random() * publicPosts.length);
        const randomPost = publicPosts[randomIndex];
        return (
            <p>
                <a href={`/posts/${randomPost?.slug}`}>✨ Random Post ✨</a>
            </p>
        );
    };

    const renderPost = (post) => (
        <div key={post.slug} className="blog__list__post">
            <p className="blog__list__post__date">
                {reformatDate(post.frontmatter.date)}
            </p>
            <a href={`/posts/${post.slug}`}>{post.frontmatter.title}</a>
        </div>
    );

    return (
        <>
            {renderRandomButton()}
            <hr />
            <div>
                {publicPosts.length > 0 &&
                    publicPosts
                        .filter(isPublicPost)
                        // Ternary operator is used to fix chromium sorting
                        // See: https://stackoverflow.com/a/36507611
                        .sort((a, b) =>
                            a.frontmatter.date < b.frontmatter.date ? 1 : -1
                        )
                        .map(renderPost)}
            </div>
        </>
    );
};

export default BlogList;
