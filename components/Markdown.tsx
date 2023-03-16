import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import * as React from "react";

interface IMarkdownProps {
	children: string;
}

const addAnchorTag = ({ node, children, ...props }) => {
	const headerSlug = node.children[0].value.replaceAll(" ", "-").toLowerCase();
	return React.createElement(node.tagName, {
		id: headerSlug,
		children: [children],
		...props,
	});
};

const Markdown = (props: IMarkdownProps) => {
	return (
		<ReactMarkdown
			remarkPlugins={[gfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
				h1: addAnchorTag,
				h2: addAnchorTag,
				h3: addAnchorTag,
				h4: addAnchorTag,
				h5: addAnchorTag,
				h6: addAnchorTag,
			}}
		>
			{props.children}
		</ReactMarkdown>
	);
};

export default Markdown;
