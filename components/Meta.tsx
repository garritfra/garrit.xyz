import Head from "next/head";
import { useEffect } from "react";

export default function Meta(props) {
	const isClient = () => !!window;

	const setupPlausible = function () {
		window.plausible =
			window.plausible ||
			function () {
				" ";
			};
		{
			(window.plausible.q = window.plausible.q || []).push(arguments);
		}
	};

	const logCtfHint = () => {
		console.log("================================================");
		console.log("Hi there! You seem to be interested in websites.");
		console.log("        Why not check out my challenge?");
		console.log("            https://garrit.xyz/ctf");
		console.log("================================================");
	};

	const pingJurassicPark = () => {
		window.fetch("https://jurassic.garrit.xyz").catch(console.log);
	};

	useEffect(() => {
		if (isClient()) {
			setupPlausible();
			logCtfHint();
			pingJurassicPark();
		}
	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>
					{props.pageTitle
						? `${props.pageTitle} | ${props.siteTitle}`
						: props.siteTitle}
				</title>
				<meta
					name="Description"
					content="Generalist software developer writing about scalable infrastructure, fullstack development and DevOps practices."
				></meta>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="manifest" href="/site.webmanifest" />

				<link
					rel="webmention"
					href="https://webmention.io/garrit.xyz/webmention"
				/>
				<link rel="pingback" href="https://webmention.io/garrit.xyz/xmlrpc" />
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3136576448658438"
					crossOrigin="anonymous"
				></script>
			</Head>
		</>
	);
}
