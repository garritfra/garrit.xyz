import { useEffect } from "react";

import Layout from "./Layout";
import Script from "next/script";
import TagIcon from "./TagIcon";

export default function Page(props) {
	const { title, date, siteTitle, tags } = props;

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

	const renderTagList = () => {
		return (
			<p className="tag-list">
				{tags.map((tag) => (
					<a key={tag} href={`/posts?tags=${tag}`}>
						#{tag}
					</a>
				))}
			</p>
		);
	};

	return (
		<Layout siteTitle={siteTitle} pageTitle={title} siteDescription={undefined}>
			<article className="page h-entry">
				{title && (
					<div className="page__info">
						<h1 className="p-name">{title}</h1>
						{date && <time className="page__info__date">{date}</time>}
						{tags && renderTagList()}
					</div>
				)}
				<div className="page__body e-content">{props.children}</div>
			</article>
		</Layout>
	);
}
