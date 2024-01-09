import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function User() {
	const { userID: id } = useParams();
	const [userID, setUserID] = useState(0);

	if (!id) return <h1>There has been an Error!</h1>;
	useEffect(() => {
		setUserID(parseInt(id));
	}, []);
	if (userID == null) return <h1>Invalid User ID!</h1>;
	return <h1>User ID: {userID}</h1>;
}
