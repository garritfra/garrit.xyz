import ReactMarkdown from "react-markdown";

function reformatDate(fullDate) {
    const date = new Date(fullDate);
    return date.toDateString().slice(4);
}

function truncateSummary(content) {
    return content.slice(0, 200).trimEnd() + "...";
}

const BlogList = ({ posts }) => {
    return (
        <>
            <ul className="list">
                {posts.length > 1 &&
                    posts
                        // Filter drafts
                        .filter((post) => !post.slug.startsWith("_"))
                        // Ternary operator is used to fix chromium sorting
                        // See: https://stackoverflow.com/a/36507611
                        .sort((a, b) =>
                            a.frontmatter.date < b.frontmatter.date ? 1 : -1
                        )
                        .map((post) => (
                            <a href={`/posts/${post.slug}`}>
                                <li>
                                    <div className="blog__info">
                                        <h2>{post.frontmatter.title}</h2>
                                        <h3>
                                            {" "}
                                            {reformatDate(
                                                post.frontmatter.date
                                            )}
                                        </h3>
                                        <p>
                                            <ReactMarkdown
                                                source={truncateSummary(
                                                    post.markdownBody
                                                )}
                                            />
                                        </p>
                                    </div>
                                </li>
                            </a>
                        ))}
            </ul>
            <style jsx>
                {`
                    margin-bottom: 0;
                    a:hover {
                        opacity: 1;
                    }
                    a:hover li div.hero_image img {
                        opacity: 0.8;
                        transition: opacity 0.3s ease;
                    }
                    a:hover li .blog__info h2,
                    a:hover li .blog__info h3,
                    a:hover li .blog__info p {
                        transform: translateX(10px);
                        transition: transform 0.5s ease-out;
                    }
                    @media (prefers-reduced-motion) {
                        a:hover li .blog__info h2,
                        a:hover li .blog__info h3,
                        a:hover li .blog__info p {
                            transform: translateX(0px);
                        }
                    }
                    .hero_image {
                        width: 100%;
                        height: 33vh;
                        overflow: hidden;
                        background-color: #000;
                    }
                    .hero_image img {
                        object-fit: cover;
                        object-position: 50% 50%;
                        opacity: 1;
                        transition: opacity 0.3s ease;
                        min-height: 100%;
                    }
                    .blog__info {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding: 1.5rem 1.25rem;
                        transform: translateX(0px);
                        transition: transform 0.3s ease-in;
                    }
                    .blog__info h2,
                    .blog__info h3,
                    .blog__info p {
                        transform: translateX(0px);
                        transition: transform 0.5s ease-out;
                    }
                    li {
                        opacity: inherit;
                        display: flex;
                        flex-direction: column;
                        min-height: 38vh;
                        margin-bottom: 0;
                    }
                    h2 {
                        margin-bottom: 0.5rem;
                    }
                    h3 {
                        margin-bottom: 1rem;
                    }
                    p {
                        max-width: 900px;
                    }
                    @media (min-width: 768px) {
                        li {
                            min-height: 250px;
                            height: 33.333vh;
                            flex-direction: row;
                        }
                        .hero_image {
                            height: 100%;
                        }
                        .hero_image img {
                            min-width: 100%;
                            height: 100%;
                            width: auto;
                            min-height: 0;
                        }
                        .blog__info {
                            min-width: 70%;
                        }
                    }
                    @media (min-width: 1280px) {
                        .blog__info {
                            padding: 3rem;
                        }
                        h3 {
                            margin-bottom: 1.2rem;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default BlogList;
