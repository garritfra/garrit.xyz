export default function Header(props) {
	return (
		<header className="header">
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
						<a href="/cv" className="underlined">
							Resume
						</a>
					</li>
					<li>
						<a href="/links" className="underlined">
							More ...
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}
