import fs from "fs/promises";
import path from "path";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Snowfall from "react-snowfall";
import matter from "gray-matter";
import gfm from "remark-gfm";
import Page from "../components/Page";
import BlogList from "../components/BlogList";
import { getPosts } from "../lib/posts";

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
	// @ts-ignore
	const content = await import("../content/index.md");
	const markdownBody = matter(content.default).content;

	const posts = await getPosts();

	return {
		props: {
			markdownBody,
			recentPosts: posts.splice(0, 5),
		},
	};
}

export default Index;
