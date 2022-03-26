import Link from "next/link";
import { useRouter } from "next/router";

const BlogList = ({ posts }) => {
    const router = useRouter();

    const isPublicPost = (post) => !post.slug.startsWith("_");
    const publicPosts = posts.filter(isPublicPost);

    const reformatDate = (fullDate) => {
        const date = new Date(fullDate);
        return date.toDateString().slice(4);
    };

    const renderRandomButton = () => {
        const randomIndex = Math.floor(Math.random() * publicPosts.length);
        const randomPost = publicPosts[randomIndex];
        const randomUrl = `/posts/${randomPost?.slug}`;
        return (
            <p>
                <Link
                    href={randomUrl}
                    onClick={() => plausible("random_post_clicked")}
                >
                    ✨ Random Post ✨
                </Link>
            </p>
        );
    };

    const renderPost = (post) => (
        <div key={post.slug} className="blog__list__post">
            <p className="blog__list__post__date">
                {reformatDate(post.frontmatter.date)}
            </p>
            <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
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
