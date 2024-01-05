export default function Header(props) {
	return (
		<header className="header">
			<nav className="nav" role="navigation" aria-label="main navigation">
				<div className="header__container">
					<a href="/" className="header__container__logo">
						{props.siteTitle}
					</a>
				</div>
				<ul className="header__links">
					<li>
						<a href="/posts">
							Blog
						</a>
					</li>
					<li>
						<a href="/contact">
							Contact
						</a>
					</li>
					<li>
						<a href="/links">
							More ...
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}
