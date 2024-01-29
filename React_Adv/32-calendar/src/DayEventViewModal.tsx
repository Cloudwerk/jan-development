import { format } from "date-fns";
import { createPortal } from "react-dom";

interface IDayEventModalProps {
	day: Date;
	setEventModalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DayEventViewModal({ day, setEventModalDate }: IDayEventModalProps) {
	return createPortal(
		<div className="modal">
			<div className="overlay"></div>
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
					<button className="event">
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
