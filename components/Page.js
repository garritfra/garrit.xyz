import Layout from "./Layout";

const SSR = typeof window === 'undefined'

export default function Page(props) {
    const { title, date, siteTitle } = props;

    const setupEditHotkey = () => {
        window.addEventListener("keypress", (e) => {
            if (e.key === ".") {
                const baseUrl =
                    "https://github.com/garritfra/garrit.xyz/edit/main/content";
                const filePath = window.location.pathname;
                const url = `${baseUrl}${filePath}.md`;
    
                window.location.href = url;
            }
        });

    }

    !SSR && setupEditHotkey();

    return (
        <Layout siteTitle={siteTitle} pageTitle={title}>
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
