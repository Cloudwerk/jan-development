import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AppRef from "./AppRef.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppRef />
	</React.StrictMode>
);
