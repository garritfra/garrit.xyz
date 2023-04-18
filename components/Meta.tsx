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
					content="Generalist developer writing about fullstack development, system administration and free software."
				></meta>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

				<link
					rel="webmention"
					href="https://webmention.io/garrit.xyz/webmention"
				/>
				<link rel="pingback" href="https://webmention.io/garrit.xyz/xmlrpc" />

				<link
					href="https://cdn.jsdelivr.net/npm/shareon@2/dist/shareon.min.css"
					rel="stylesheet"
				/>
			</Head>
		</>
	);
}
