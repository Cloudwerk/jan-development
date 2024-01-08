import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./Router.tsx";
import { RouterProvider } from "react-router-dom";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
