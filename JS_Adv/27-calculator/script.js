import Calculator from "./calculator";

const output = document.querySelector(".output");
const primaryOperand = output.querySelector(".primary-operand");
const secondaryOperand = output.querySelector(".secondary-operand");
const operation = output.querySelector("[data-operation]");

const calculator = new Calculator(primaryOperand, secondaryOperand, operation);

document.addEventListener("click", (e) => {
	if (e.target.matches("[data-all-clear]")) {
		calculator.clear();
	}
	if (e.target.matches("[data-number]")) {
		calculator.addDigit(e.target.textContent);
	}
	if (e.target.matches("[data-delete]")) {
		calculator.removeLastDigit();
	}
	if (e.target.matches("[data-operation]")) {
		calculator.chooseOperation(e.target.textContent);
	}
	if (e.target.matches("[data-equals]")) {
		calculator.evaluate();
	}
});
