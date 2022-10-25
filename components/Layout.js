import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

export default function Layout({
	siteTitle,
	siteDescription,
	pageTitle,
	children,
}) {
	return (
		<section className={`layout`}>
			<Meta
				siteTitle={siteTitle}
				siteDescription={siteDescription}
				pageTitle={pageTitle}
			/>
			<Header siteTitle={siteTitle} />
			<div className="content">{children}</div>
			<Footer />
		</section>
	);
}
