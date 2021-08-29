import TypeIt from "typeit-react";

export default function Header(props) {
    return (
        <header className="header">
            <nav className="nav" role="navigation" aria-label="main navigation">
                <a href="/" className="header__logo">
                    <TypeIt options={{ strings: [props.siteTitle], speed: 30, lifeLike: true }}>{props.siteTitle}</TypeIt>
                </a>
                <ul className="header__links">
                    <li>
                        <a href="/posts">Blog</a>
                    </li>
                    <li>
                        <a href="/cv">Resume</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
