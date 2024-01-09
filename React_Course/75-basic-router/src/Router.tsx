import { createBrowserRouter } from "react-router-dom";
import { Navbar } from "./navbar";
import { Posts } from "./pages/Posts";
import { Users } from "./pages/Users";
import { Todos } from "./pages/Todos";
import { Post } from "./pages/Post";
import { User } from "./pages/User";
import { LoadingWrapper } from "./pages/Wrappers/LoadingWrapper";
import {
	FetchPostData,
	FetchSinglePostData,
	FetchSingleUserData,
	FetchTodosData,
	FetchUsersData,
} from "./utils/loaderfunctions";

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
						loader: FetchPostData,
					},
					{
						path: ":PostId",
						element: <Post />,
						loader: FetchSinglePostData,
					},
				],
			},
			{
				path: "/Users",
				children: [
					{ index: true, element: <Users />, loader: FetchUsersData },
					{ path: ":userID", element: <User />, loader: FetchSingleUserData },
				],
			},
			{ path: "/Todos", element: <Todos />, loader: FetchTodosData },
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
