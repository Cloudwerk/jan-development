import { format, isBefore, isSameDay, isSameMonth } from "date-fns";

interface IDayCardsProps {
	day: Date;
	currentMonth: Date;
	setEventModalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DayCard({ day, currentMonth, setEventModalDate }: IDayCardsProps) {
	const sameDay = isSameDay(day, Date.now());
	if (isSameMonth(currentMonth, new Date())) {
		return (
			<div
				className={`day ${isSameMonth(day, currentMonth) ? "" : "non-month-day"} ${
					isBefore(day, currentMonth) && !sameDay ? "old-month-day" : ""
				}`}
			>
				<div className="day-header">
					<div className="week-name" onClick={() => setEventModalDate(day)}>
						{format(day, "eee")}
					</div>
					<div className={`day-number ${sameDay ? "today" : ""}`}>{format(day, "d")}</div>
					<button className="add-event-btn">+</button>
				</div>
			</div>
		);
	}
	if (isBefore(currentMonth, new Date())) {
		return (
			<div className={`day ${isSameMonth(day, currentMonth) ? "" : "non-month-day"} old-month-day`}>
				<div className="day-header">
					<div className="week-name" onClick={() => setEventModalDate(day)}>
						{format(day, "eee")}
					</div>
					<div className={`day-number`}>{format(day, "d")}</div>
					<button className="add-event-btn">+</button>
				</div>
			</div>
		);
	}
	return (
		<div
			className={`day ${isSameMonth(day, currentMonth) ? "" : "non-month-day"} ${
				isBefore(day, Date.now()) && !sameDay ? "old-month-day" : ""
			}`}
		>
			<div className="day-header">
				<div className="week-name" onClick={() => setEventModalDate(day)}>
					{format(day, "eee")}
				</div>
				<div className={`day-number ${sameDay ? "today" : ""}`}>{format(day, "d")}</div>
				<button className="add-event-btn">+</button>
			</div>
		</div>
	);
}
