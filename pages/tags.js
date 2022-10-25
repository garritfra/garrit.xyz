import BlogList from "../components/BlogList";
import Page from "../components/Page";
import matter from "gray-matter";

const Index = (props) => {
	return (
		<Page siteTitle="Garrit's Notes">
			<h1>Filter posts by tag</h1>
			<div className="tag-list">
				{props.tags.map(({ tag, count }) => (
					<div className="tag-list__tag" key={tag}>
						<a href={`/posts?tags=${tag}`}>
							{tag} ({count})
						</a>
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

		const postTags = keys
			.map((key, index) => {
				const value = values[index];
				// Parse yaml metadata & markdownbody in document

				const document = matter(value.default);
				const rawTags = document.data?.tags || "";
				return rawTags.split(",").map((tag) => tag.trim());
			})
			.flat()
			.filter((value) => value !== "");

		const tagMap = {};

		for (const tag of postTags) {
			tagMap[tag] ? tagMap[tag]++ : (tagMap[tag] = 1);
		}

		return postTags
			.flat()
			.filter((value, index, array) => array.indexOf(value) === index) // Deduplicate
			.filter((value) => value !== "")
			.sort()
			.map((tag) => ({ tag, count: tagMap[tag] }))
			.sort((a, b) => b.count - a.count);
	})(require.context("../content/posts", true, /\.md$/));

	return {
		props: {
			tags,
			description: "",
		},
	};
}

export default Index;
