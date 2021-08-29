import Layout from "../../components/Layout";
import BlogList from "../../components/BlogList";
import Page from "../../components/Page";
import matter from "gray-matter";

const Index = (props) => {
    return (
        <Page siteTitle="Garrit's Notes">
            <BlogList posts={props.posts} />
        </Page>
    );
};

export async function getStaticProps() {
    //get posts & context from folder
    const posts = ((context) => {
        const keys = context.keys();
        const values = keys.map(context);

        const data = keys.map((key, index) => {
            // Create slug from filename
            const slug = key
                .replace(/^.*[\\\/]/, "")
                .split(".")
                .slice(0, -1)
                .join(".");
            const value = values[index];
            // Parse yaml metadata & markdownbody in document
            const document = matter(value.default);
            return {
                frontmatter: document.data,
                markdownBody: document.content,
                slug,
            };
        });
        return data;
    })(require.context("../../content/posts", true, /\.md$/));

    return {
        props: {
            posts,
            description: "",
        },
    };
}

export default Index;
