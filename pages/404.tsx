import { useEffect } from "react";
import Page from "../components/Page";

export default function FourOhFour() {
	const setupEditRoute = () => {
		if (window.location.href.endsWith("/edit")) {
			const baseUrl =
				"https://github.com/garritfra/garrit.xyz/edit/main/content";
			const filePath = window.location.pathname.replace(/\/edit$/, "");
			const url = `${baseUrl}${filePath}.md`;
			window.location.href = url;
		}
	};

	useEffect(() => {
		setupEditRoute();
	}, []);

	return (
		<Page>
			<h1>404 - Page Not Found</h1>
			<a href="/">Go back home</a>
		</Page>
	);
}
