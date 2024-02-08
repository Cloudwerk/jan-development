import { useRef } from "react";
import "./styles.css";

function App() {
	const positionRef = useRef<HTMLSelectElement>(null);
	const messageRef = useRef<HTMLInputElement>(null);

	const idInputRef = useRef<HTMLInputElement>(null);
	const delPositionRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<div className="form">
				<label htmlFor="position">Position</label>
				<select name="position" ref={positionRef}>
					<option value={"top-right"}>Top Right</option>
					<option value={"top-left"}>Top Left</option>
					<option value={"top-center"}>Top Center</option>
					<option value={"bottom-right"}>Bottom Right</option>
					<option value={"bottom-left"}>Bottom Left</option>
					<option value={"bottom-center"}>Bottom Center</option>
				</select>
				<label htmlFor="message">Message</label>
				<input name="message" type="text" ref={messageRef}></input>
				<div>{`ID:`}</div>
				<button type="button">Submit</button>
				<div>.</div>
				<label htmlFor="messageId">Message ID</label>
				<input type="text" name="messageId" ref={idInputRef} />
				<label htmlFor="positionDEL">Positions</label>
				<input type="text" name="positionDEL" ref={delPositionRef} />
				<button type="button">Delete</button>
			</div>
		</>
	);
}

export default App;
