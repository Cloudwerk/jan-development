import { IEventProps } from "../AddEventModal";
import { CalendarEvent } from "./CalendarEvent";

interface Props {
	events: Array<IEventProps>;
}

export function EventContainer({ events }: Props) {
	if (events.length > 0)
		return (
			<div className="events">
				{events.map((event) => {
					return <CalendarEvent event={event} />;
				})}
			</div>
		);
	return "";
}
