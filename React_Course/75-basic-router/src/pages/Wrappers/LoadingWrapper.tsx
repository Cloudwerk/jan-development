import { Outlet, useNavigation } from "react-router-dom";

type test = {
	state: "loading";
};

export function LoadingWrapper() {
	const { state } = useNavigation();
	const typechecker: test = { state: "loading" };

	return (
		<>
			{state === typechecker.state ? (
				<>
					<div className="loading-spinner"></div>
					<div className="container loading">
						<h2>LOADING</h2>
					</div>
				</>
			) : (
				<div className="container">
					<Outlet />
				</div>
			)}
		</>
	);
}
