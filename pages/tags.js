import BlogList from "../components/BlogList";
import Page from "../components/Page";
import matter from "gray-matter";

const Index = (props) => {
    return (
        <Page siteTitle="Garrit's Notes">
            <h1>Filter posts by tag</h1>
            <div className="tag-list">
                {props.tags.map((tag) => (
                    <div className="tag-list__tag" key={tag}>
                        <a href={`/posts?tags=${tag}`}>{tag}</a>
                    </div>
                ))}
            </div>
        </Page>
    );
};

export async function getStaticProps() {
    //get posts & context from folder
    const tags = ((context) => {
        const keys = context.keys();
        const values = keys.map(context);

        const tags = keys.map((key, index) => {
            console.log(values);
            const value = values[index];
            // Parse yaml metadata & markdownbody in document

            const document = matter(value.default);
            const rawTags = document.data?.tags || "";
            return rawTags.split(",").map((tag) => tag.trim());
        });
        return tags
            .flat()
            .filter((value, index, array) => array.indexOf(value) === index) // Deduplicate
            .filter((value) => value !== "")
            .sort();
    })(require.context("../content/posts", true, /\.md$/));

    return {
        props: {
            tags,
            description: "",
        },
    };
}

export default Index;
