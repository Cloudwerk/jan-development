import { useRef, useState } from "react";
import { useToastDispatchContext } from "./ToastContextProvider";
import { toastPositions } from "./utils/models";

export function ToastForms() {
	const [currentId, setCurrentId] = useState(1);
	const dispatchToasts = useToastDispatchContext();

	const positionRef = useRef<HTMLSelectElement>(null);
	const messageRef = useRef<HTMLInputElement>(null);

	const idInputRef = useRef<HTMLInputElement>(null);
	const delPositionRef = useRef<HTMLInputElement>(null);

	function onCreateNewToast(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (messageRef.current && positionRef.current) {
			if (messageRef.current.value !== "" && positionRef.current.value !== "") {
				const toastPosition = positionRef.current.value as toastPositions;
				dispatchToasts({
					action: "ADD",
					payload: { id: currentId, message: messageRef.current.value, position: toastPosition },
				});
				setCurrentId((id) => id + 1);
			}
		}
	}

	function onDeleteToast(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
	}

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
				<div>{`ID: ${currentId}`}</div>
				<button type="submit" onClick={(e) => onCreateNewToast(e)}>
					Submit
				</button>
				<div>.</div>
				<label htmlFor="messageId">Message ID</label>
				<input type="text" name="messageId" ref={idInputRef} />
				<label htmlFor="positionDEL">Positions</label>
				<input type="text" name="positionDEL" ref={delPositionRef} />
				<button type="submit" onClick={(e) => onDeleteToast(e)}>
					Delete
				</button>
			</div>
		</>
	);
}
