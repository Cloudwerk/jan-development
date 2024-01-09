import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import { Navbar } from "./navbar";
import { Posts } from "./pages/Posts";
import { Users } from "./pages/Users";
import { Todos } from "./pages/Todos";
import { Post } from "./pages/Post";
import { User } from "./pages/User";
import { LoadingWrapper } from "./pages/Wrappers/LoadingWrapper";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const router = createBrowserRouter([
	{
		element: <NavLayout />,
		children: [
			{ path: "/", element: <h1>Hello!</h1> },
			{
				path: "/Posts",
				children: [
					{
						index: true,
						element: <Posts />,
						loader: ({ request: { signal } }) => {
							return fetch(`${API_URL}/Posts`, { signal }).then((res) => {
								if (res.status === 200) return res.json();

								throw redirect("/404");
							});
						},
					},
					{
						path: ":PostId",
						element: <Post />,
					},
				],
			},
			{
				path: "/Users",
				children: [
					{ index: true, element: <Users /> },
					{ path: ":userID", element: <User /> },
				],
			},
			{ path: "/Todos", element: <Todos /> },
		],
	},
]);

function NavLayout() {
	return (
		<>
			<Navbar />
			<LoadingWrapper />
		</>
	);
}
