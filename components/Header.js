import { useLayoutEffect, useState } from "react";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}

export default function Header(props) {
    const [windowWidth, windowHeight] = useWindowSize();

    return (
        <header className="header">
            <nav className="nav" role="navigation" aria-label="main navigation">
                <a href="/">
                    <h1>{props.siteTitle}</h1>
                </a>
                <ul className="header__links">
                    <li><a href="/posts">Blog</a></li>
                    <li><a href="/cv">Resume</a></li>
                </ul>
            </nav>
        </header>
    );
}
