const FileSystem = require("./FileSystem");
const Account = require("./Account");

beforeEach(() => {
	jest.restoreAllMocks();
});

describe("#deposit", () => {
	test("it adds money to the account", async () => {
		const startingBalance = 5;
		const account = await createAccount("Kyle", startingBalance);
		const amount = 10;
		const spy = jest
			.spyOn(FileSystem, "write")
			.mockReturnValue(Promise.resolve());

		await account.deposit(amount);
		expect(account.balance).toBe(amount + startingBalance);
		expect(spy).toHaveBeenCalledWith(
			account.filePath,
			amount + startingBalance
		);
	});
});

async function createAccount(name, balance) {
	const spy = jest
		.spyOn(FileSystem, "read")
		.mockReturnValue(Promise.resolve(balance));
	const account = await Account.find(name);
	spy.mockRestore();
	return account;
}
describe("#withdraw", () => {
	test("it subtracts money from the account", async () => {
		const startingBalance = 10;
		const account = await createAccount("Kyle", startingBalance);
		const amount = 5;
		const spy = jest
			.spyOn(FileSystem, "write")
			.mockReturnValue(Promise.resolve());

		await account.withdraw(amount);
		expect(account.balance).toBe(startingBalance - amount);
		expect(spy).toHaveBeenCalledWith(
			account.filePath,
			startingBalance - amount
		);
	});

	test("it throws an error if the balance is insufficient", async () => {
		const startingBalance = 10;
		const account = await createAccount("Kyle", startingBalance);
		const amount = 15;
		const spy = jest.spyOn(FileSystem, "write");

		await expect(account.withdraw(amount)).rejects.toThrow();
		expect(account.balance).toBe(startingBalance);
		expect(spy).not.toHaveBeenCalled();
	});
});
