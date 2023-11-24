import { parse, handleMath } from "./parse.js";

describe("#parse", () => {
	test("parenthesis front", () => {
		expect(parse("(3 - 1) * 2")).toBe(4);
	});
	test("parenthesis back", () => {
		expect(parse("2 * (3 - 1)")).toBe(4);
	});
	test("multiple parenthesis", () => {
		expect(parse("2 ^ ((3 - (4 / 2)) * 5)")).toBe(32);
	});
	test("addition", () => {
		expect(parse("3 + 1")).toBe(4);
	});
	test("substraction", () => {
		expect(parse("3 - 1")).toBe(2);
	});
	test("muliplication", () => {
		expect(parse("3 * 2")).toBe(6);
	});
	test("division", () => {
		expect(parse("3 / 2")).toBe(1.5);
	});
	test("exponent", () => {
		expect(parse("3^2")).toBe(9);
	});
	test("chaining", () => {
		expect(parse("2 * 3 ^ 2 / 3 - 1 + 2")).toBe(7);
	});
	test("NaN", () => {
		expect(parse("sdsdfdsaf")).toBeNaN();
	});
	test("large number", () => {
		expect(parse("999999999999999 + 99999999999999")).toBe(1099999999999998);
	});
	test("small number", () => {
		expect(parse("0.000000000000001 + 0.99999999999999")).toBe(
			0.999999999999991
		);
	});
});

describe("#handle-math", () => {
	const operand1 = 10;
	const operand2 = 5;
	test("addition", () => {
		const group = { operand1: operand1, operand2: operand2, operation: "+" };
		expect(handleMath(group)).toBe(15);
	});
	test("subtraction", () => {
		const group = { operand1: operand1, operand2: operand2, operation: "-" };
		expect(handleMath(group)).toBe(5);
	});
	test("multiplication", () => {
		const group = { operand1: operand1, operand2: operand2, operation: "*" };
		expect(handleMath(group)).toBe(50);
	});
	test("divison", () => {
		const group = { operand1: operand1, operand2: operand2, operation: "/" };
		expect(handleMath(group)).toBe(2);
	});
	test("exponent", () => {
		const group = { operand1: operand1, operand2: operand2, operation: "^" };
		expect(handleMath(group)).toBe(100000);
	});
	test("NaN", () => {
		const group = {
			operand1: "kjdsflasdf",
			operand2: "dfsdfsdf",
			operation: "dfasdfas",
		};
		expect(handleMath(group)).toBeNaN();
	});
	test("WrongInput", () => {
		expect(handleMath("jdflasjdf")).toBeNaN();
	});
	test("large number", () => {
		const group = {
			operand1: 999999999999999,
			operand2: 99999999999999,
			operation: "+",
		};
		expect(handleMath(group)).toBe(1099999999999998);
	});
	test("small number", () => {
		const group = {
			operand1: 0.000000000000001,
			operand2: 0.99999999999999,
			operation: "+",
		};
		expect(handleMath(group)).toBe(0.999999999999991);
	});
});
