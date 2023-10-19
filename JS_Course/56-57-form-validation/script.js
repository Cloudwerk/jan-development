const form = document.querySelector(`#form`);
const username = form.querySelector(`#username`);
const password = form.querySelector(`#password`);
const passwordRepeat = form.querySelector(`#password-confirmation`);
const terms = form.querySelector(`#terms`);

const errorListElement = form.querySelector(`.errors-list`);
const errorsContainer = form.querySelector(`.errors`);

const errorMessages = [
	"Username must be at least 6 characters long",
	"Password must be at least 10 characters long",
	"Passwords must match",
	"You must accept the terms",
];

form.addEventListener("submit", (e) => {
	const isValid = [false, false, false, false];

	if (!formValidation(isValid)) {
		e.preventDefault();

		clearErrors();

		const activeErrors = [];
		for (let i = 0; i < isValid.length; i++) {
			if (!isValid[i]) {
				activeErrors.push(errorMessages[i]);
			}
		}
		showErrors(activeErrors);
	} else {
		clearErrors();
	}
});

function formValidation(isValid) {
	let falseFlag = true;
	if (username.value.length > 5) isValid[0] = true;
	else falseFlag = false;
	if (password.value.length > 9) isValid[1] = true;
	else falseFlag = false;
	if (passwordRepeat.value == password.value) isValid[2] = true;
	else falseFlag = false;
	if (terms.checked) isValid[3] = true;
	else falseFlag = false;

	return falseFlag;
}

function clearErrors() {
	while (errorListElement.children.length > 0) {
		errorListElement.children[0].remove();
	}

	errorsContainer.classList.remove("show");
}

function showErrors(errorMessages) {
	errorMessages.forEach((msg) => {
		let newElement = document.createElement("LI");
		newElement.innerText = msg;
		errorListElement.appendChild(newElement);
	});

	errorsContainer.classList.add("show");
}
