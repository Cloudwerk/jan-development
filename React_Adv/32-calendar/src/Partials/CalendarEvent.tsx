import { format } from "date-fns";
import { IEventProps } from "../AddEventModal";

interface Props {
	event: IEventProps;
}

export function CalendarEvent({ event }: Props) {
	if (event.allDay)
		return (
			<button className={`all-day-event ${event.color} event`}>
				<div className="event-name">{event.name}</div>
			</button>
		);
	return (
		<button className="event">
			<div className={`color-dot ${event.color}`}></div>
			<div className="event-time">{event.startTime ? format(event.startTime, "h a") : "0 AM"}</div>
			<div className="event-name">{event.name}</div>
		</button>
	);
}
