import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

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

const code = ({ node, inline, className, children, ...props }) => {
	const match = /language-(\w+)/.exec(className || "");
	return !inline && match ? (
		<SyntaxHighlighter
			children={String(children).replace(/\n$/, "")}
			style={darcula}
			language={match[1]}
            PreTag="div"
			{...props}
		/>
	) : (
		<code className={className} {...props}>
			{children}
		</code>
	);
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
				code,
			}}
		>
			{props.children}
		</ReactMarkdown>
	);
};

export default Markdown;
