import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Page from "../../components/Page";
import glob from "glob";

export default function BlogTemplate(props) {
    function reformatDate(fullDate) {
        const date = new Date(fullDate);
        return date.toDateString().slice(4);
    }

    /*
     ** Odd fix to get build to run
     ** It seems like on first go the props
     ** are undefined — could be a Next bug?
     */

    if (!props.frontmatter) return <></>;

    return (
        <Page title={props.frontmatter.title} date={reformatDate(props.frontmatter.date)}>
            <ReactMarkdown
                source={props.markdownBody}
                date={props.frontmatter.date}
            />
            <hr />
            <p>
                If you enjoyed this post, consider{" "}
                <a href="https://donate.slashdev.space">buying me a coffee</a>!
                Got comments? Send me a{" "}
                <a href="mailto:garrit@slashdev.space">Mail</a>, or shoot me a
                message on{" "}
                <a href="https://matrix.to/#/@garrit:matrix.slashdev.space">
                    Matrix
                </a>
                .
            </p>
            <div className="blog__footer">
                <h3>Written By: Garrit Franke</h3>
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
            siteTitle: "~garrit",
            frontmatter: data.data,
            markdownBody: data.content,
        },
    };
}

export async function getStaticPaths() {
    //get all .md files in the posts dir
    const blogs = glob.sync("content/posts/**/*.md");

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
