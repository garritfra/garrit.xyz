import Link from "next/link";
import Page from "../components/Page";

const SSR = typeof window === "undefined";

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

	!SSR && setupEditRoute();
	return (
		<Page>
			<h1>404 - Page Not Found</h1>
			<Link href="/">
				<a>Go back home</a>
			</Link>
		</Page>
	);
}
