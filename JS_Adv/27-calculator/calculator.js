export default class Calculator {
	constructor(primaryOperand, secondaryOperand, operation) {
		this.#primaryOperandDisplay = primaryOperand;
		this.#secondaryOperandDisplay = secondaryOperand;
		this.#operationDisplay = operation;

		this.clear();
	}

	#primaryOperandDisplay;
	#secondaryOperandDisplay;
	#operationDisplay;

	clear() {
		this.#secondaryOperandDisplay.textContent = "";
		this.#operationDisplay.textContent = "";
		this.#primaryOperandDisplay.textContent = "";
	}

	removeLastDigit() {
		if (this.#primaryOperandDisplay.textContent != "") {
			let newContent = this.#primaryOperandDisplay.textContent.slice(0, -1);
			newContent = this.#removeCommas(newContent);
			newContent = this.#addCommas(newContent);
			this.#primaryOperandDisplay.textContent = newContent;
		}
	}

	addDigit(digit) {
		let newNumber = this.#primaryOperandDisplay.textContent + digit;
		newNumber = this.#removeCommas(newNumber);
		newNumber = this.#addCommas(newNumber);
		this.#primaryOperandDisplay.textContent = newNumber;
	}

	chooseOperation(operation) {
		if (this.#secondaryOperandDisplay.textContent == "") {
			this.#secondaryOperandDisplay.textContent =
				this.#primaryOperandDisplay.textContent;
			this.#primaryOperandDisplay.textContent = "";
		} else {
			this.evaluate();
			this.#secondaryOperandDisplay.textContent =
				this.#primaryOperandDisplay.textContent;
			this.#primaryOperandDisplay.textContent = "";
		}
		this.#operationDisplay.textContent = operation;
	}

	evaluate() {
		let result = "";
		switch (this.#operationDisplay.textContent) {
			default:
				result = undefined;
				break;
			case "*":
				result =
					Number(this.#removeCommas(this.#primaryOperandDisplay.textContent)) *
					Number(this.#removeCommas(this.#secondaryOperandDisplay.textContent));
				break;
			case "+":
				result =
					Number(this.#removeCommas(this.#primaryOperandDisplay.textContent)) +
					Number(this.#removeCommas(this.#secondaryOperandDisplay.textContent));
				break;
			case "-":
				result =
					Number(
						this.#removeCommas(this.#secondaryOperandDisplay.textContent)
					) -
					Number(this.#removeCommas(this.#primaryOperandDisplay.textContent));
				break;
			case "÷":
				result =
					Number(
						this.#removeCommas(this.#secondaryOperandDisplay.textContent)
					) /
					Number(this.#removeCommas(this.#primaryOperandDisplay.textContent));
				break;
		}
		this.#secondaryOperandDisplay.textContent = "";
		this.#operationDisplay.textContent = "";
		this.#primaryOperandDisplay.textContent = result;
	}

	#removeCommas(nStr) {
		let regex = /,/;
		while (regex.test(nStr)) {
			nStr = nStr.replace(regex, "");
		}
		return nStr;
	}
	#addCommas(nStr) {
		nStr += "";
		let x = nStr.split(".");
		let x1 = x[0];
		let x2 = x.length > 1 ? "." + x[1] : "";
		let rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, "$1" + "," + "$2");
		}
		return x1 + x2;
	}
}
