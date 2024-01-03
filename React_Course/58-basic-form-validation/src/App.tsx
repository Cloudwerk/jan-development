import { useMemo, useState } from "react";
import "./styles.css";
import { ErrorMessage } from "./ErrorMessage";
import { emailValidation, passwordValidation } from "./validators";

function App() {
	const [mail, setMail] = useState("test@test.com");
	const [password, setPassword] = useState("");
	const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

	const passwordErrorMessages = useMemo(() => {
		return hasBeenSubmitted ? passwordValidation(password) : [];
	}, [hasBeenSubmitted, password]);

	const mailErrorMessage = useMemo(() => {
		return hasBeenSubmitted ? emailValidation(mail) : "";
	}, [hasBeenSubmitted, mail]);

	function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setHasBeenSubmitted(true);

		emailValidation(mail);
		passwordValidation(password);
	}

	return (
		<>
			<h2>Use State</h2>
			<form className="form" onSubmit={(e) => onFormSubmit(e)}>
				<div className={`form-group ${mailErrorMessage !== "" ? "error" : ""}`}>
					<label className="label" htmlFor="email">
						Email
					</label>
					<input
						className="input"
						type="email"
						id="email"
						value={mail}
						onChange={(e) => {
							setMail(e.target.value);
						}}
					/>
					{mailErrorMessage !== "" ? <ErrorMessage message={mailErrorMessage}></ErrorMessage> : <></>}
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
						onChange={(e) => {
							setPassword(e.target.value);
						}}
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
