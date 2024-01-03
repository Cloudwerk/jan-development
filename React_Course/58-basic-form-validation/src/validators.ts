const PW_LC_REGEX = /([a-z])+/;
const PW_UC_REGEX = /([A-Z])+/;
const NUMBER_REGEX = /([0-9])+/;

export function emailValidation(mail: string) {
	if (mail === "") {
		return "Cannot be blank!";
	} else if (!mail.match("@webdevsimplified.com")) {
		return "Must end in @webdevsimplified.com";
	}

	return "";
}

export function passwordValidation(password: string) {
	const errorMessages = [];

	if (password === "") {
		errorMessages.push("Cannot be blank!");
	}
	if (password.length < 10) {
		errorMessages.push("Must be 10 characters or longer!");
	}
	if (!password.match(PW_LC_REGEX)) {
		errorMessages.push("Must include a lowercase letter");
	}
	if (!password.match(PW_UC_REGEX)) {
		errorMessages.push("Must include a uppercase letter");
	}
	if (!password.match(NUMBER_REGEX)) {
		errorMessages.push("Must include a number");
	}

	return errorMessages;
}
