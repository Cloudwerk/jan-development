import { useState } from "react";
import "./styles.css";

function App() {
	const [mail, setMail] = useState("test@test.com");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [isMailError, setIsMailError] = useState(false);
	const [mailErrorMessage, setMailErrorMessage] = useState("");

	function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (mail === "") {
			setIsMailError(true);
			setMailErrorMessage("Cannot be blank!");
		} else if (!mail.match("@webdevsimplified.com")) {
			setIsMailError(true);
			setMailErrorMessage("Must end in @webdevsimplified.com");
		} else if (isMailError) {
			setIsMailError(false);
		}

		//validation
	}

	return (
		<>
			<form className="form" onSubmit={(e) => onFormSubmit(e)}>
				<div className={`form-group ${isMailError ? "error" : ""}`}>
					<label className="label" htmlFor="email">
						Email
					</label>
					<input className="input" type="email" id="email" value={mail} onChange={(e) => setMail(e.target.value)} />
					<div className={`msg ${isMailError ? "" : "hidden"}`}>{mailErrorMessage}</div>
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
