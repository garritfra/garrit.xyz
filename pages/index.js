import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import Page from "../components/Page";

const Index = (props) => {
    return (
        <Page siteTitle="Garrit's Site">
            <ReactMarkdown>
                {props.markdownBody}
            </ReactMarkdown>
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
