import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import glob from "glob";
import Page from "../components/Page";

export default function PageTemplate(props) {
    /*
     ** Odd fix to get build to run
     ** It seems like on first go the props
     ** are undefined — could be a Next bug?
     */
    if (!props.frontmatter) return <></>;

    return (
        <Page title={props.frontmatter.title}>
            <ReactMarkdown source={props.markdownBody} />
        </Page>
    );
}

export async function getStaticProps({ ...ctx }) {
    const { page } = ctx.params;
    const content = await import(`../content/${page}.md`);
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
    const pages = glob.sync("content/*.md");

    //remove path and extension to leave filename only
    const pageSlugs = pages.map((file) =>
        file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
    );

    // create paths with `slug` param
    const paths = pageSlugs.map((slug) => `/${slug}`);

    return {
        paths,
        fallback: false,
    };
}
