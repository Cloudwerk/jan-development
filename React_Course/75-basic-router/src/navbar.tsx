import { Link } from "react-router-dom";

export function Navbar() {
	return (
		<nav className="top-nav">
			<div className="nav-text-large">My App</div>
			<ul className="nav-list">
				<li>
					<Link to="/posts">Posts</Link>
				</li>
				<li>
					<Link to="/posts">Users</Link>
				</li>
				<li>
					<Link to="/posts">Todos</Link>
				</li>
			</ul>
		</nav>
	);
}
