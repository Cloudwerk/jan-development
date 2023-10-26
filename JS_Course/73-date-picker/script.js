import {
	format,
	getUnixTime,
	fromUnixTime,
	addMonths,
	subMonths,
	startOfMonth,
	subDays,
	endOfMonth,
	eachDayOfInterval,
	getDay,
	addDays,
	isSameDay,
} from "date-fns";

const toggleModalBtn = document.querySelector(".date-picker-button");
const activeMonthText = document.querySelector(".current-month");
const datepicker = document.querySelector(".date-picker");
const datePickerGridDateContainer = document.querySelector(
	".date-picker-grid-dates"
);
const previousMonthButton = document.querySelector(".prev-month-button");
const nextMonthButton = document.querySelector(".next-month-button");
let currentDate = new Date();
let currentSelectedDate = new Date();

function setDate(date) {
	toggleModalBtn.textContent = format(date, "MMMM do yyyy");
	toggleModalBtn.dataset.selectedDate = getUnixTime(date);
}

function setUpDatePicker(selectedDate) {
	activeMonthText.textContent = format(currentDate, "MMMM -  yyyy");
	setupDates(selectedDate);
}

function setSelectedDateAsSelected(dates) {
	dates.forEach((date) => {
		date.classList.remove("selected");
		if (isSameDay(fromUnixTime(date.dataset.utcdate), currentSelectedDate))
			date.classList.add("selected");
	});
}

function setupDates(selectedDate) {
	let dates = document.querySelectorAll(".date");
	dates.forEach((date) => {
		date.classList.remove("date-picker-other-month-date");
	});
	// console.log(dates);
	const firstWeekStart = getDay(startOfMonth(selectedDate));
	// console.log(firstWeekStart);

	const currentMonthInterval = {
		start: startOfMonth(selectedDate),
		end: endOfMonth(selectedDate),
	};

	const entireMonthByDays = eachDayOfInterval(currentMonthInterval);
	let weeksInMonthInDays = 28;
	// console.log(entireMonthByDays);

	// Add another row to the calendar, if the month is spread over 6 weeks
	if (
		(entireMonthByDays.length > 30 && firstWeekStart > 4) ||
		(entireMonthByDays.length > 28 && firstWeekStart > 5)
	) {
		for (let i = 35; i < 42; i++) {
			dates[i].classList.toggle("noshow");
		}

		weeksInMonthInDays = 35;
	} else if (!dates[35].classList.contains("noshow")) {
		for (let i = 35; i < 42; i++) {
			dates[i].classList.toggle("noshow");
		}
	}

	// set before other month days
	const lastDayOfLastMonth = endOfMonth(subMonths(selectedDate, 1));
	for (let weekDay = 0; weekDay < 7 - (7 - firstWeekStart); weekDay++) {
		const date = dates[weekDay];
		date.classList.add("date-picker-other-month-date");
		date.textContent = `${format(
			subDays(lastDayOfLastMonth, 6 - (7 - firstWeekStart) - weekDay),
			"d"
		)}`;
		date.dataset.utcdate = getUnixTime(
			subDays(lastDayOfLastMonth, 6 - (7 - firstWeekStart) - weekDay)
		);
	}

	// set regular days
	for (let week = 0; week < 34; week += 7) {
		for (
			let weekDay = 0;
			weekDay <= 7 && week + weekDay < entireMonthByDays.length;
			weekDay++
		) {
			dates[weekDay + firstWeekStart + week].textContent = `${
				week + weekDay + 1
			}`;
			dates[weekDay + firstWeekStart + week].dataset.utcdate = getUnixTime(
				addDays(startOfMonth(selectedDate), week + weekDay)
			);
		}
	}

	//set after month days
	for (
		let weekDay = getDay(entireMonthByDays[entireMonthByDays.length - 1]) + 1,
			i = 1;
		weekDay < 7;
		weekDay++, i++
	) {
		const day = dates[weekDay + weeksInMonthInDays];
		day.classList.add("date-picker-other-month-date");
		day.textContent = i;
		day.dataset.utcdate = getUnixTime(
			addDays(startOfMonth(addMonths(currentDate, 1)), i - 1)
		);
	}

	setSelectedDateAsSelected(dates);
}

nextMonthButton.addEventListener("click", () => {
	currentDate = addMonths(currentDate, 1);
	setUpDatePicker(currentDate);
});
previousMonthButton.addEventListener("click", () => {
	currentDate = subMonths(currentDate, 1);
	setUpDatePicker(currentDate);
});

toggleModalBtn.addEventListener("click", () => {
	datepicker.classList.toggle("show");
	const selectedDate = fromUnixTime(toggleModalBtn.dataset.selectedDate);
	currentDate = selectedDate;
	setUpDatePicker(selectedDate);
});

setDate(new Date());

datePickerGridDateContainer.addEventListener("click", (e) => {
	if (!e.target.matches(".date")) return;
	if (e.target.classList.contains("date-picker-other-month-date")) return;
	let currentSelectedBtn = document.querySelector(".selected");
	if (currentSelectedBtn != null)
		currentSelectedBtn.classList.remove("selected");
	e.target.classList.toggle("selected");
	const selectedDate = fromUnixTime(e.target.dataset.utcdate);
	currentSelectedDate = selectedDate;
	setDate(selectedDate);
});
