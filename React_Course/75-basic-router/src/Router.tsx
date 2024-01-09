import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar } from "./navbar";
import { Posts } from "./pages/Posts";
import { Users } from "./pages/Users";
import { Todos } from "./pages/Todos";
import { Post } from "./pages/Post";

export const router = createBrowserRouter([
	{
		element: <NavLayout />,
		children: [
			{ path: "/", element: <h1>Hello!</h1> },
			{
				path: "/Posts",
				children: [
					{ index: true, element: <Posts /> },
					{
						path: ":PostId",
						element: <Post />,
					},
				],
			},
			{ path: "/Users", element: <Users /> },
			{ path: "/Todos", element: <Todos /> },
		],
	},
]);

function NavLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
