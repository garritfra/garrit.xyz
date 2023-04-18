import { useEffect } from "react";

import Layout from "./Layout";
import Script from "next/script";

export default function Page(props) {
	const { title, date, siteTitle } = props;

	const setupEditHook = () => {
		window.addEventListener("keypress", (e) => {
			const baseUrl =
				"https://github.com/garritfra/garrit.xyz/edit/main/content";
			if (e.key === ".") {
				const filePath = window.location.pathname;
				const url = `${baseUrl}${filePath}.md`;
				window.location.href = url;
			}
		});
	};

	useEffect(() => {
		setupEditHook();
	}, []);

	return (
		<Layout siteTitle={siteTitle} pageTitle={title} siteDescription={undefined}>
			<article className="page h-entry">
				{title && (
					<div className="page__info">
						<h1 className="p-name">{title}</h1>
						{date && <time className="page__info__date">{date}</time>}
					</div>
				)}
				<div className="page__body e-content">{props.children}</div>
			</article>
			<Script
				src="https://cdn.jsdelivr.net/npm/shareon@2/dist/shareon.iife.js"
				defer
				/*
      			// @ts-ignore */
				init
			></Script>
		</Layout>
	);
}
