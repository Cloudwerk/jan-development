import { format, isBefore, isSameMonth } from "date-fns";

interface IDayCardsProps {
	day: Date;
	currentMonth: Date;
}

export function DayCard({ day, currentMonth }: IDayCardsProps) {
	return (
		<div
			className={`day ${isSameMonth(day, currentMonth) ? "" : "non-month-day"} ${
				isBefore(day, currentMonth) ? "old-month-day" : ""
			}`}
		>
			<div className="day-header">
				<div className="week-name">{format(day, "eee")}</div>
				<div className="day-number">{format(day, "d")}</div>
				<button className="add-event-btn">+</button>
			</div>
		</div>
	);
}
