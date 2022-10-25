import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import gfm from "remark-gfm";
import Page from "../components/Page";

const Index = (props) => {
	return (
		<Page className="h-card" siteTitle="Garrit Franke">
			<ReactMarkdown remarkPlugins={[gfm]}>{props.markdownBody}</ReactMarkdown>
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
