import { Link } from "react-router-dom";

export function Navbar() {
	return (
		<nav className="top-nav">
			<div className="nav-text-large">My App</div>
			<ul className="nav-list">
				<li>
					<Link to="/Posts">Posts</Link>
				</li>
				<li>
					<Link to="/Users">Users</Link>
				</li>
				<li>
					<Link to="/Todos">Todos</Link>
				</li>
			</ul>
		</nav>
	);
}
