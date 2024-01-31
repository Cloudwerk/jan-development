import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RadioBtn } from "./Partials/RadioBtn";
import { useLocalStorage } from "./Partials/useLocalStorage";

interface IAddEventModalProps {
	day: Date;
	setAddEventModalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	addEventModalDate: Date | undefined;
}

export interface IEventProps {
	name: string;
	allDay: boolean;
	startTime: Date;
	endTime: Date;
	color: "Blue" | "Green" | "Red";
}

export function AddEventModal({ day, setAddEventModalDate, addEventModalDate }: IAddEventModalProps) {
	const nameRef = useRef<HTMLInputElement>(null);
	const allDayRef = useRef<HTMLInputElement>(null);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const [color, setColor] = useState<"Blue" | "Green" | "Red">("Blue");
	const { setValue } = useLocalStorage(`${format(day, "yyyy_MM_dd")}-event`, Array<IEventProps>());

	function clearForm() {
		nameRef.current ? (nameRef.current.value = "") : "";
		allDayRef.current ? (allDayRef.current.checked = false) : "";
		startTimeRef.current ? (startTimeRef.current.valueAsDate = null) : "";
		endTimeRef.current ? (endTimeRef.current.valueAsDate = null) : "";
		setColor("Blue");
	}

	useEffect(() => {
		nameRef.current?.focus();
	}, [addEventModalDate]);

	function formSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setValue((oldData: Array<IEventProps>) => [
			...oldData,
			{
				name: nameRef.current?.value,
				allDayRef: allDayRef.current?.checked,
				startTime: startTimeRef.current?.valueAsDate,
				endTime: endTimeRef.current?.valueAsDate,
				color: color,
			},
		]);
	}

	return createPortal(
		<div className="modal">
			<div
				className="overlay"
				onClick={() => {
					setAddEventModalDate(undefined);
				}}
			></div>
			<div
				className="modal-body"
				onKeyDown={(e) => {
					if (e.key === "Escape") {
						setAddEventModalDate(undefined);
					}
				}}
			>
				<div className="modal-title">
					<div>Add Event</div>
					<small>{format(day, "dd/MMM/yy")}</small>
					<button className="close-btn" onClick={() => setAddEventModalDate(undefined)}>
						&times;
					</button>
				</div>
				<form onSubmit={formSubmit}>
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
