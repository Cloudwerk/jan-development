import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface IDayEventModalProps {
	day: Date;
	setEventModalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	eventModalDate: Date | undefined;
}

export function DayEventViewModal({ day, setEventModalDate, eventModalDate }: IDayEventModalProps) {
	const bodyRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		bodyRef.current?.focus();
	}, [eventModalDate]);
	return createPortal(
		<div
			className="modal"
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					setEventModalDate(undefined);
				}
			}}
		>
			<div
				className="overlay"
				onClick={() => {
					setEventModalDate(undefined);
				}}
			></div>
			<div className="modal-body">
				<div className="modal-title">
					{format(day, "dd/MMM/yy")}
					<button className="close-btn" onClick={() => setEventModalDate(undefined)}>
						&times;
					</button>
				</div>
				<div className="events">
					<button className="all-day-event green event">
						<div className="event-name">Short</div>
					</button>
					<button className="event" ref={bodyRef}>
						<div className="color-dot blue"></div>
						<div className="event-time">7am</div>
						<div className="event-name">Event Name</div>
					</button>
					<button className="event">
						<div className="color-dot green"></div>
						<div className="event-time">8am</div>
						<div className="event-name">Event Name</div>
					</button>
					<button className="event">
						<div className="color-dot blue"></div>
						<div className="event-time">9am</div>
						<div className="event-name">Event Name</div>
					</button>
					<button className="event">
						<div className="color-dot blue"></div>
						<div className="event-time">10am</div>
						<div className="event-name">Event Name</div>
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
}
