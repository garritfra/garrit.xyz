import Page from "../components/Page";
import { getAllTags } from "../lib/tags";

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
			<p>
				Each tag also has their own RSS feed, under{" "}
				<code>/feeds/*tag*.xml</code>
			</p>
		</Page>
	);
};

export async function getStaticProps() {
	const tags = await getAllTags();

	return {
		props: {
			tags,
			description: "",
		},
	};
}

export default Index;
