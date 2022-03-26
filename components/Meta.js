import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

export default function Meta(props) {
    const isClient = () => !!window;
    useEffect(() => {
        if (isClient()) {
            window.plausible =
                window.plausible ||
                function () {
                    " ";
                };
            {
                (window.plausible.q = window.plausible.q || []).push(arguments);
            }
        }
    }, []);

    return (
        <>
            <Script
                defer
                data-domain="garrit.xyz"
                src="https://analytics.slashdev.space/js/plausible.js"
            ></Script>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta charSet="utf-8" />
                <title>{props.siteTitle}</title>
                <meta
                    name="Description"
                    content="Generalist developer writing about fullstack development, system administration and free software."
                ></meta>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

                <link
                    rel="webmention"
                    href="https://webmention.io/garrit.xyz/webmention"
                />
                <link
                    rel="pingback"
                    href="https://webmention.io/garrit.xyz/xmlrpc"
                />
            </Head>
        </>
    );
}
