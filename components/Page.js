import Layout from "./Layout";

export default function Page(props) {
    const { title, date } = props;
    return (
        <Layout siteTitle={title}>
            <article className="page">
                { title && <div className="page__info">
                    <h1>{title}</h1>
                    {date && <h3 className="page__info__date">{date}</h3>}
                </div> }
                <div className="page__body">{props.children}</div>
                <div className="page__footer"></div>
            </article>
        </Layout>
    );
}
