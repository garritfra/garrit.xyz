import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Snowfall from "react-snowfall";
import matter from "gray-matter";
import gfm from "remark-gfm";
import Page from "../components/Page";
import BlogList from "../components/BlogList";

const Index = (props) => {
	// TODO: Can this be simplified?
	const [SSR, setSSR] = useState(true);
	useEffect(() => {
		setSSR(false);
	});

	const mediaQuery =
		!SSR && window.matchMedia("(prefers-reduced-motion: reduce)");
	const prefersReducedMotion = !mediaQuery || mediaQuery.matches;

	const isWinter = new Date().getMonth() > 10 || new Date().getMonth() < 1;

	const buildSnow = () => {
		return (
			<Snowfall
				snowflakeCount={100}
				style={{
					position: "fixed",
					width: "100vw",
					height: "100vh",
				}}
			/>
		);
	};

	return (
		<Page className="h-card" siteTitle="Garrit Franke">
			{isWinter && !prefersReducedMotion && buildSnow()}
			<ReactMarkdown remarkPlugins={[gfm]}>{props.markdownBody}</ReactMarkdown>
			<h2>Recent posts</h2>
			<BlogList posts={props.recentPosts}></BlogList>
		</Page>
	);
};

export async function getStaticProps() {
	const content = await import("../content/index.md");
	const data = matter(content.default);

	const posts = ((context) => {
		const keys = context.keys();
		const values = keys.map(context);

		const data = keys
			.map((key, index) => {
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
					slug,
				};
			})
			.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
			.slice(0, 6);
		return data;
	})(require.context("../content/posts", true, /\.md$/));

	return {
		props: {
			markdownBody: data.content,
			recentPosts: posts,
		},
	};
}

export default Index;
