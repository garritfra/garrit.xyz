export default function Header(props) {
    return (
        <header className="header">
            <a
                href="https://www.comebackalive.in.ua/"
                style={{ height: "64px", textAlign: "center" }}
                onClick={() => plausible("ukraine_banner_clicked")}
                className="flag--ukraine"
                target="_blank"
            >
                Help Ukraine
            </a>
            <nav className="nav" role="navigation" aria-label="main navigation">
                <div className="header__container">
                    <a href="/" className="header__container__logo underlined">
                        {props.siteTitle}
                    </a>
                </div>
                <ul className="header__links">
                    <li>
                        <a href="/posts" className="underlined">
                            Blog
                        </a>
                    </li>
                    <li>
                        <a href="/contact" className="underlined">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="/cv" className="underlined">
                            Resume
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}