import { useState, useRef } from "react";
import "./styles.css";
import { ErrorMessage } from "./ErrorMessage";
import { emailValidation, passwordValidation } from "./validators";

function AppRef() {
	const mailRef = useRef<any>();
	const passwordRef = useRef<any>();
	const [passwordErrorMessages, setPasswordErrorMessages] = useState(Array<string>);
	const [mailErrorMessage, setMailErrorMessage] = useState("");

	const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

	function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setHasBeenSubmitted(true);

		setMailErrorMessage(emailValidation(mailRef.current.value));
		setPasswordErrorMessages(passwordValidation(passwordRef.current.value));
	}

	return (
		<>
			<h2>Use Ref</h2>
			<form className="form" onSubmit={(e) => onFormSubmit(e)}>
				<div className={`form-group ${mailErrorMessage !== "" ? "error" : ""}`}>
					<label className="label" htmlFor="email">
						Email
					</label>
					<input
						className="input"
						type="email"
						id="email"
						ref={mailRef}
						onChange={() => {
							hasBeenSubmitted ? setMailErrorMessage(emailValidation(mailRef.current.value)) : [];
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
						ref={passwordRef}
						type="password"
						id="password"
						onChange={() => {
							hasBeenSubmitted ? setPasswordErrorMessages(passwordValidation(passwordRef.current.value)) : [];
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

export default AppRef;
