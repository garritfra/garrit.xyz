import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import Page from "../components/Page";

const Index = (props) => {
    return (
        <Page>
            <ReactMarkdown source={props.markdownBody} />
        </Page>
    );
};

export async function getStaticProps() {
    const content = await import(`../content/index.md`);
    const data = matter(content.default);

    return {
        props: {
            markdownBody: data.content,
        },
    };
}

export default Index;
