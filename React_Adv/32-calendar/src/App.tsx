import { add, format, startOfMonth, sub } from "date-fns";
import { useEffect, useState } from "react";

function App() {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	useEffect(() => {
		setCurrentMonth((month) => startOfMonth(month));
	}, []);
	console.log(format(currentMonth, "MMMM"));

	function changeMonth(isPrevious: boolean) {
		if (isPrevious) {
			setCurrentMonth((month) => startOfMonth(sub(month, { months: 1 })));
			return;
		}
		setCurrentMonth((month) => startOfMonth(add(month, { months: 1 })));
	}
	return (
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
				<div className="day non-month-day old-month-day">
					<div className="day-header">
						<div className="week-name">Sun</div>
						<div className="day-number">28</div>
						<button className="add-event-btn">+</button>
					</div>
					<div className="events">
						<button className="all-day-event blue event">
							<div className="event-name">Short</div>
						</button>
						<button className="all-day-event green event">
							<div className="event-name">Long Event Name That Just Keeps Going</div>
						</button>
						<button className="event">
							<div className="color-dot blue"></div>
							<div className="event-time">7am</div>
							<div className="event-name">Event Name</div>
						</button>
					</div>
				</div>
				<div className="day non-month-day old-month-day">
					<div className="day-header">
						<div className="week-name">Mon</div>
						<div className="day-number">29</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day non-month-day old-month-day">
					<div className="day-header">
						<div className="week-name">Tue</div>
						<div className="day-number">30</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day non-month-day old-month-day">
					<div className="day-header">
						<div className="week-name">Wed</div>
						<div className="day-number">31</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="week-name">Thu</div>
						<div className="day-number">1</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="week-name">Fri</div>
						<div className="day-number">2</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="week-name">Sat</div>
						<div className="day-number">3</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">4</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">5</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">6</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">7</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">8</div>
						<button className="add-event-btn">+</button>
					</div>
					<div className="events">
						<button className="all-day-event blue event">
							<div className="event-name">Short</div>
						</button>
						<button className="all-day-event red event">
							<div className="event-name">Long Event Name That Just Keeps Going</div>
						</button>
						<button className="event">
							<div className="color-dot red"></div>
							<div className="event-time">7am</div>
							<div className="event-name">Event Name</div>
						</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">9</div>
						<button className="add-event-btn">+</button>
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
						<button className="event">
							<div className="color-dot red"></div>
							<div className="event-time">11am</div>
							<div className="event-name">Event Name</div>
						</button>
					</div>
					<button className="events-view-more-btn">+2 More</button>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">10</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">11</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">12</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day old-month-day">
					<div className="day-header">
						<div className="day-number">13</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number today">14</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">15</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">16</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">17</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">18</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">19</div>
						<button className="add-event-btn">+</button>
					</div>
					<div className="events">
						<button className="all-day-event blue event">
							<div className="event-name">Short</div>
						</button>
						<button className="all-day-event blue event">
							<div className="event-name">Long Event Name That Just Keeps Going</div>
						</button>
						<button className="event">
							<div className="color-dot blue"></div>
							<div className="event-time">7am</div>
							<div className="event-name">Event Name</div>
						</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">20</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">21</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">22</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">23</div>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">24</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">25</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">26</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">27</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">28</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">29</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day">
					<div className="day-header">
						<div className="day-number">30</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
				<div className="day non-month-day">
					<div className="day-header">
						<div className="day-number">1</div>
						<button className="add-event-btn">+</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

{
	/* <div className="modal">
  <div className="overlay"></div>
  <div className="modal-body">
    <div className="modal-title">
      6/8/23
      <button className="close-btn">&times;</button>
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
</div>  */
}

{
	/* <div className="modal">
  <div className="overlay"></div>
  <div className="modal-body">
    <div className="modal-title">
      <div>Add Event</div>
      <small>6/8/23</small>
      <button className="close-btn">&times;</button>
    </div>
    <form>
      <div className="form-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div className="form-group checkbox">
        <input type="checkbox" name="all-day" id="all-day" />
        <label for="all-day">All Day?</label>
      </div>
      <div className="row">
        <div className="form-group">
          <label for="start-time">Start Time</label>
          <input type="time" name="start-time" id="start-time" />
        </div>
        <div className="form-group">
          <label for="end-time">End Time</label>
          <input type="time" name="end-time" id="end-time" />
        </div>
      </div>
      <div className="form-group">
        <label>Color</label>
        <div className="row left">
          <input
            type="radio"
            name="color"
            value="blue"
            id="blue"
            checked
            className="color-radio"
          />
          <label for="blue"><span className="sr-only">Blue</span></label>
          <input
            type="radio"
            name="color"
            value="red"
            id="red"
            className="color-radio"
          />
          <label for="red"><span className="sr-only">Red</span></label>
          <input
            type="radio"
            name="color"
            value="green"
            id="green"
            className="color-radio"
          />
          <label for="green"><span className="sr-only">Green</span></label>
        </div>
      </div>
      <div className="row">
        <button className="btn btn-success" type="submit">Add</button>
        <button className="btn btn-delete" type="button">Delete</button>
      </div>
    </form>
  </div>
</div> ); */
}
