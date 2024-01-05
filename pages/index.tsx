import { useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import matter from "gray-matter";
import Page from "../components/Page";
import BlogList from "../components/BlogList";
import { getPublishedPosts } from "../lib/posts";
import Markdown from "../components/Markdown";
import useSSR from "../hooks/useSSR";

const Index = (props) => {
	const SSR = useSSR();

	const mediaQuery =
		!SSR && window.matchMedia("(prefers-reduced-motion: reduce)");
	const prefersReducedMotion = !mediaQuery || mediaQuery.matches;

	const isWinter = new Date().getMonth() >= 11;

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
			<Markdown>{props.markdownBody}</Markdown>
			<h2>Recent posts</h2>
			<BlogList posts={props.recentPosts}></BlogList>
		</Page>
	);
};

export async function getStaticProps() {
	// @ts-ignore
	const content = await import("../content/index.md");
	const markdownBody = matter(content.default).content;

	const posts = await getPublishedPosts(false);

	return {
		props: {
			markdownBody,
			recentPosts: posts.splice(0, 5),
		},
	};
}

export default Index;
