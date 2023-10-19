const form = document.querySelector(`#quiz-form`);
const alert = document.querySelector(`#alert`);
const questions = document.querySelectorAll(`.question-item`);

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let correctAnswers = 0;

	questions.forEach((q) => {
		const aw = q.querySelectorAll(`.answer`);

		let greatSuccess = false;
		aw.forEach((a) => {
			if (a.checked && a.value === "true") greatSuccess = true;
		});

		if (greatSuccess == true) {
			q.classList.add("correct");
			q.classList.remove("incorrect");
			correctAnswers++;
		} else {
			q.classList.add("incorrect");
			q.classList.remove("correct");
		}
	});

	if (correctAnswers == 3) {
		alert.classList.add("active");
		setTimeout(disableAlert, 2000);
	}
});

function disableAlert() {
	alert.classList.remove("active");
}
