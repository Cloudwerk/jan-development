import { useRef, useState } from "react";
import { useToastDispatchContext, useToastValueContext } from "./ToastContextProvider";
import { toastPositions } from "./utils/models";

export function ToastForms() {
	const [currentId, setCurrentId] = useState(1);
	const [isAutoDissmiss, setIsAutoDissmiss] = useState(false);
	const dispatchToasts = useToastDispatchContext();
	const toasts = useToastValueContext();

	const positionRef = useRef<HTMLSelectElement>(null);
	const messageRef = useRef<HTMLInputElement>(null);
	const dismissMSRef = useRef<HTMLInputElement>(null);

	const idInputRef = useRef<HTMLInputElement>(null);

	function onCreateNewToast(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (messageRef.current && positionRef.current) {
			if (messageRef.current.value !== "" && positionRef.current.value !== "") {
				const toastPosition = positionRef.current.value as toastPositions;
				if (isAutoDissmiss) {
					const dismissTime = dismissMSRef.current ? parseInt(dismissMSRef.current.value) : 1000;
					dispatchToasts({
						action: "ADD",
						payload: {
							id: currentId,
							message: messageRef.current.value,
							position: toastPosition,
							autoDismiss: true,
							autoDismissTimeout: dismissTime,
						},
					});
				} else {
					dispatchToasts({
						action: "ADD",
						payload: {
							id: currentId,
							message: messageRef.current.value,
							position: toastPosition,
							autoDismiss: false,
						},
					});
				}
				setCurrentId((id) => id + 1);
			}
		}
	}

	function onDeleteToast(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (idInputRef.current && idInputRef.current.value != undefined) {
			const id = parseInt(idInputRef.current.value);
			const toast = toasts.find((t) => t.id === id);
			if (toast) dispatchToasts({ action: "DEL", payload: toast });
		}
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
				<label htmlFor="autoDismiss">Auto Dismiss?</label>
				<input
					name="autoDismiss"
					type="checkbox"
					checked={isAutoDissmiss}
					onChange={() => setIsAutoDissmiss((value) => !value)}
				/>
				{isAutoDissmiss ? (
					<>
						<label htmlFor="autoDismissTimeout">Dismiss after how many ms?</label>
						<input name="autoDismissTimeout" type="number" ref={dismissMSRef} />
					</>
				) : (
					""
				)}
				<div>{`ID: ${currentId}`}</div>
				<button type="submit" onClick={(e) => onCreateNewToast(e)}>
					Submit
				</button>
				<div>.</div>
				<label htmlFor="messageId">Message ID</label>
				<input type="text" name="messageId" ref={idInputRef} />
				<label htmlFor="positionDEL">Position</label>
				<button type="submit" onClick={(e) => onDeleteToast(e)}>
					Delete
				</button>
			</div>
		</>
	);
}
