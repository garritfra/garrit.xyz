import Layout from "./Layout";

export default function Page(props) {
    const { title, date, siteTitle } = props;
    return (
        <Layout siteTitle={siteTitle}>
            <article className="page h-entry">
                { title && <div className="page__info">
                    <h1 className="p-name">{title}</h1>
                    {date && <h3 className="page__info__date">{date}</h3>}
                </div> }
                <div className="page__body e-content">{props.children}</div>
            </article>
        </Layout>
    );
}
