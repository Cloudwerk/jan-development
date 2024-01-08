import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar } from "./navbar";

export const router = createBrowserRouter([
	{
		element: <NavLayout />,
		children: [{ path: "/", element: <h1>Hello!</h1> }],
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
