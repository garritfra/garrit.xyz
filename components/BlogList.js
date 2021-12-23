import ReactMarkdown from "react-markdown";

function reformatDate(fullDate) {
    const date = new Date(fullDate);
    return date.toDateString().slice(4);
}

function truncateSummary(content) {
    const firstParagraph = content.split("\n\n")[0];
    if (firstParagraph.length > 200) {
        return content.slice(0, 200).trimEnd() + "...";
    } else {
        return firstParagraph;
    }
}

const BlogList = ({ posts }) => {
    return (
        <div className="blog__list">
            {posts.length > 0 &&
                posts
                    // Filter drafts
                    .filter((post) => !post.slug.startsWith("_"))
                    // Ternary operator is used to fix chromium sorting
                    // See: https://stackoverflow.com/a/36507611
                    .sort((a, b) =>
                        a.frontmatter.date < b.frontmatter.date ? 1 : -1
                    )
                    .map((post) => (
                        <div className="blog__list__post" key={post.slug}>
                            <a href={`/posts/${post.slug}`}>
                                <h2>{post.frontmatter.title}</h2>
                                <h4 className="blog__list__post__date">
                                    {reformatDate(post.frontmatter.date)}
                                </h4>
                                <p>
                                    <ReactMarkdown>
                                        {truncateSummary(post.markdownBody)}
                                    </ReactMarkdown>
                                </p>
                            </a>
                        </div>
                    ))}
        </div>
    );
};

export default BlogList;
