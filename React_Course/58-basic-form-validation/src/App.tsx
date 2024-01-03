import { useState } from "react";
import "./styles.css";

function App() {
	const [mail, setMail] = useState("test@test.com");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	let mailError = false;

	function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		//validation
	}

	return (
		<>
			<form className="form" onSubmit={(e) => onFormSubmit(e)}>
				<div className={`form-group ${mailError ? "error" : ""}`}>
					<label className="label" htmlFor="email">
						Email
					</label>
					<input className="input" type="email" id="email" value={mail} onChange={(e) => setMail(e.target.value)} />
					<div className={`msg ${mailError ? "" : "hidden"}`}>Must end in @webdevsimplified.com</div>
				</div>
				<div className="form-group">
					<label className="label" htmlFor="password">
						Password
					</label>
					<input
						className="input"
						value={password}
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button className="btn" type="submit">
					Submit
				</button>
			</form>
		</>
	);
}

export default App;
