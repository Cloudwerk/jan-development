import { format } from "date-fns";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RadioBtn } from "./Partials/RadioBtn";

interface IAddEventModalProps {
	day: Date;
	setAddEventModalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function AddEventModal({ day, setAddEventModalDate }: IAddEventModalProps) {
	const nameRef = useRef<HTMLInputElement>(null);
	const allDayRef = useRef<HTMLInputElement>(null);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const [color, setColor] = useState<"Blue" | "Green" | "Red">("Blue");

	function clearForm() {
		nameRef.current ? (nameRef.current.value = "") : "";
		allDayRef.current ? (allDayRef.current.checked = false) : "";
		startTimeRef.current ? (startTimeRef.current.valueAsDate = null) : "";
		endTimeRef.current ? (endTimeRef.current.valueAsDate = null) : "";
		setColor("Blue");
	}

	return createPortal(
		<div className="modal">
			<div className="overlay"></div>
			<div className="modal-body">
				<div className="modal-title">
					<div>Add Event</div>
					<small>{format(day, "dd/MMM/yy")}</small>
					<button className="close-btn" onClick={() => setAddEventModalDate(undefined)}>
						&times;
					</button>
				</div>
				<form>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" name="name" id="name" ref={nameRef} />
					</div>
					<div className="form-group checkbox">
						<input type="checkbox" name="all-day" id="all-day" ref={allDayRef} />
						<label htmlFor="all-day">All Day?</label>
					</div>
					<div className="row">
						<div className="form-group">
							<label htmlFor="start-time">Start Time</label>
							<input type="time" name="start-time" id="start-time" ref={startTimeRef} />
						</div>
						<div className="form-group">
							<label htmlFor="end-time">End Time</label>
							<input type="time" name="end-time" id="end-time" ref={endTimeRef} />
						</div>
					</div>
					<div className="form-group">
						<label>Color</label>
						<div className="row left">
							<RadioBtn
								name="color"
								value="blue"
								id="blue"
								checked={color === "Blue"}
								onChange={() => setColor("Blue")}
								className="color-radio"
							/>
							<label htmlFor="blue">
								<span className="sr-only">Blue</span>
							</label>
							<RadioBtn
								name="color"
								value="red"
								id="red"
								checked={color === "Red"}
								onChange={() => setColor("Red")}
								className="color-radio"
							/>
							<label htmlFor="red">
								<span className="sr-only">Red</span>
							</label>
							<RadioBtn
								name="color"
								value="green"
								id="green"
								checked={color === "Green"}
								onChange={() => setColor("Green")}
								className="color-radio"
							/>
							<label htmlFor="green">
								<span className="sr-only">Green</span>
							</label>
						</div>
					</div>
					<div className="row">
						<button className="btn btn-success" type="submit">
							Add
						</button>
						<button className="btn btn-delete" type="button" onClick={() => clearForm()}>
							Delete
						</button>
					</div>
				</form>
			</div>
		</div>,
		document.body
	);
}
