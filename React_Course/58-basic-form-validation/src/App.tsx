import { useState } from "react";
import "./styles.css";
import { ErrorMessage } from "./ErrorMessage";

function App() {
	const [mail, setMail] = useState("test@test.com");
	const [password, setPassword] = useState("");
	const [passwordErrorMessages, setPasswordErrorMessages] = useState(Array<string>);
	const [isMailError, setIsMailError] = useState(false);
	const [mailErrorMessage, setMailErrorMessage] = useState("");

	const PW_LC_REGEX = /([a-z])+/;
	const PW_UC_REGEX = /([A-Z])+/;
	const NUMBER_REGEX = /([0-9])+/;

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

		setPasswordErrorMessages([]);
		if (password === "") {
			setPasswordErrorMessages(["Cannot be blank!"]);
		}
		if (password.length < 10) {
			setPasswordErrorMessages((msg) => [...msg, "Must be 10 characters or longer!"]);
		}
		if (!password.match(PW_LC_REGEX)) {
			setPasswordErrorMessages((msg) => [...msg, "Must include a lowercase letter"]);
		}
		if (!password.match(PW_UC_REGEX)) {
			setPasswordErrorMessages((msg) => [...msg, "Must include a uppercase letter"]);
		}
		if (!password.match(NUMBER_REGEX)) {
			setPasswordErrorMessages((msg) => [...msg, "Must include a number"]);
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
					{isMailError ? <ErrorMessage message={mailErrorMessage}></ErrorMessage> : <></>}
				</div>
				<div className={`form-group ${passwordErrorMessages.length >= 1 ? "error" : ""}`}>
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
					{passwordErrorMessages.map((msg) => {
						return <ErrorMessage message={msg}></ErrorMessage>;
					})}
				</div>
				<button className="btn" type="submit">
					Submit
				</button>
			</form>
		</>
	);
}

export default App;
