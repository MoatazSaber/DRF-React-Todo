import React from "react";

export default function Navbar(props) {
	return (
		<nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
			<span className="navbar-brand">
				{props.user
					? `Hello,${props.user.username}`
					: `Hello, Stranger`}
			</span>

			<ul className="navbar-nav ml-auto">
				<li className="nav-item ">
					<a
						className="nav-link "
						href={!props.user ? "api/login/" : "api/logout/"}
					>
						{!props.user ? `Sign In` : `Sign Out`}
					</a>
				</li>
			</ul>
		</nav>
	);
}
