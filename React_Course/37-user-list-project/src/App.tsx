import { useEffect, useState } from "react";
import "./App.css";
import { UserLi } from "./UserLi";

interface UserObject {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: number;
			lng: number;
		};
	};
	phone: string;
	website: string;
}

function App() {
	const [users, setUsers] = useState([]);
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

	let loadingContent;
	if (loading) loadingContent = <h2>Loading...</h2>;
	else loadingContent = undefined;

	return (
		<>
			<h1>User List</h1>
			{loadingContent}
			{error == undefined && (
				<pre>
					{users.map((item: UserObject) => {
						return <UserLi key={item.id} name={item.name}></UserLi>;
					})}
				</pre>
			)}
		</>
	);
}

export default App;
