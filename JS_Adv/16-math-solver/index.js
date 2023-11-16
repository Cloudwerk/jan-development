const form = document.querySelector("#equation-form");
const equationElement = document.querySelector("#equation");
const outputElement = document.querySelector("#results");

const BRACKET_REGEX = /\((?<equation>[^\(\)]*)\)/;
const EXPONENT_REGEX = /(?<operand1>\S+)\s*(?<operation>[\^])\s*(?<operand2>\S+)/;
const MULTIPLY_DIVIDE_REGEX = /(?<operand1>\S+)\s*(?<operation>[\*\/])\s*(?<operand2>\S+)/;
const PLUS_MINUS_REGEX = /(?<operand1>\S+)\s*(?<operation>(?<!e)[\+\-])\s*(?<operand2>\S+)/;
const ALL_REGEX = /\d+\s*[\*\/\+\-\^]\s*\d+|\(.*\)/;

form?.addEventListener("submit", (e) => {
	e.preventDefault();
	outputElement.textContent = parse(equationElement.value);
});

function parse(equation) {
	if (equation.match(BRACKET_REGEX)) {
		const result = parse(equation.match(BRACKET_REGEX).groups.equation);
		equation = equation.replace(BRACKET_REGEX, result);
	} else if (equation.match(EXPONENT_REGEX)) {
		const result = handleMath(equation.match(EXPONENT_REGEX).groups);
		equation = equation.replace(EXPONENT_REGEX, result);
	} else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
		const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups);
		equation = equation.replace(MULTIPLY_DIVIDE_REGEX, result);
	} else if (equation.match(PLUS_MINUS_REGEX)) {
		const result = handleMath(equation.match(PLUS_MINUS_REGEX).groups);
		equation = equation.replace(PLUS_MINUS_REGEX, result);
	}
	if (equation.match(ALL_REGEX)) {
		return parse(equation);
	} else {
		return parseFloat(equation);
	}
}

function handleMath({ operand1, operand2, operation }) {
	const number1 = parseFloat(operand1);
	const number2 = parseFloat(operand2);

	switch (operation) {
		case "*":
			return number1 * number2;
		case "/":
			return number1 / number2;
		case "+":
			return number1 + number2;
		case "-":
			return number1 - number2;
		case "^":
			return number1 ** number2;
		default:
			return NaN;
	}
}
