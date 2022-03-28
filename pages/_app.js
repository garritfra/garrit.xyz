import PlausibleProvider from "next-plausible";
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
    return (
        <PlausibleProvider
            domain="garrit.xyz"
            customDomain="https://analytics.slashdev.space"
            trackOutboundLinks
        >
            <Component {...pageProps} />;
        </PlausibleProvider>
    );
}

export default MyApp;
