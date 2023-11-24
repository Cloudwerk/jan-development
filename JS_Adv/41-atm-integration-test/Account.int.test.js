const Account = require("./Account");
const fs = require("fs");

beforeEach(() => {
	try {
		fs.mkdirSync("accounts");
	} catch {
		//Ignore error -> Folder exists
	}
});

afterEach(() => {
	fs.rmSync("accounts", { recursive: true, force: true });
});

describe(".create", () => {
	test("it creates a new account and file", async () => {
		const name = "Kyle";
		const account = await Account.create(name);
		expect(account.name).toBe(name);
		expect(account.balance).toBe(0);
		expect(fs.readFileSync(account.filePath).toString()).toBe("0");
	});
});

describe(".find", () => {
	test("it returns the account", async () => {
		const name = "Kyle";
		const balance = 10;
		fs.writeFileSync(`accounts/${name}.txt`, balance.toString());
		const account = await Account.find(name);
		expect(account.name).toBe(name);
		expect(account.balance).toBe(balance);
	});

	test("account doesn't exist", async () => {
		const name = "Kyle";
		const account = await Account.find(name);
		expect(account).toBeUndefined();
	});
});

describe(".withdraw", () => {
	test("it withdraws an amount", async () => {
		const name = "Kyle";
		const balance = 10;
		const amount = 5;
		fs.writeFileSync(`accounts/${name}.txt`, balance.toString());
		const account = await Account.find(name);
		await account.withdraw(amount);
		expect(account.balance).toBe(balance - amount);
	});
});
