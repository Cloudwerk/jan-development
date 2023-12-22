import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [users, setUsers] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		setLoading(true);
		setError(undefined);
		const controller = new AbortController();
		fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
			.then((res) => {
				if (res.status == 200) return res.json();
				else return Promise.reject(res);
			})
			.then((data) => {
				setUsers(data);
			})
			.catch((e) => {
				if (e?.name === "AbortError") return;
				setError(e);
			})
			.finally(() => setLoading(false));

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<>
			<h1>User List</h1>
			<ul>{JSON.stringify(users)}</ul>
		</>
	);
}

export default App;
