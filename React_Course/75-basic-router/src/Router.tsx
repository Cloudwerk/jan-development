import { Navigate, createBrowserRouter } from "react-router-dom";
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
import { NewPost } from "./pages/NewPost";

export const router = createBrowserRouter([
	{
		element: <NavLayout />,
		children: [
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
					{
						path: "new",
						element: <NewPost />,
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
			{ path: "/404", element: <ErrorNotExist /> },
			{ path: "*", element: <Navigate to="/Posts" /> },
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

function ErrorNotExist() {
	return (
		<div className="container">
			<h2>Oops!</h2>
			<p>This site doesn't exist!</p>
		</div>
	);
}
