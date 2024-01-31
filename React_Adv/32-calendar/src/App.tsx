import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, sub } from "date-fns";
import { useState } from "react";
import { DayCard } from "./DayCard";
import { DayEventViewModal } from "./DayEventViewModal";
import { AddEventModal } from "./AddEventModal";

function App() {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [eventModalDate, setEventModalDate] = useState<Date | undefined>(undefined);
	const [addEventModalDate, setAddEventModalDate] = useState<Date | undefined>(undefined);

	function changeMonth(isPrevious: boolean) {
		if (isPrevious) {
			setCurrentMonth((month) => sub(month, { months: 1 }));
			return;
		}
		setCurrentMonth((month) => add(month, { months: 1 }));
	}

	function calcStartingDay() {
		return startOfWeek(startOfMonth(currentMonth));
	}
	function calcLastDay() {
		return endOfWeek(endOfMonth(currentMonth));
	}

	function calcAllDaysForView() {
		return eachDayOfInterval({ start: calcStartingDay(), end: calcLastDay() });
	}

	return (
		<>
			{addEventModalDate ? (
				<AddEventModal
					day={addEventModalDate}
					setAddEventModalDate={setAddEventModalDate}
					addEventModalDate={addEventModalDate}
				/>
			) : (
				""
			)}
			{eventModalDate ? (
				<DayEventViewModal day={eventModalDate} setEventModalDate={setEventModalDate} eventModalDate={eventModalDate} />
			) : (
				""
			)}
			<div className="calendar">
				<div className="header">
					<button className="btn">Today</button>
					<div>
						<button className="month-change-btn" onClick={() => changeMonth(true)}>
							&lt;
						</button>
						<button className="month-change-btn" onClick={() => changeMonth(false)}>
							&gt;
						</button>
					</div>
					<span className="month-title">{format(currentMonth, "MMMM yyyy")}</span>
				</div>
				<div className="days">
					{calcAllDaysForView().map((day) => {
						return (
							<DayCard
								day={day}
								setEventModalDate={setEventModalDate}
								currentMonth={currentMonth}
								setAddEventModalDate={setAddEventModalDate}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default App;
