// 1. Ask for account
// 2. If Account does not exist -> ask to create account
// 3. ask what they want to do
// 4. Exeute Command
// a. View
// b. Withdraw
// c. Deposit

// Account
const Account = require("./Account.js");
const CommandLine = require("./CommandLine.js");

async function main() {
	CommandLine.ask("Which account would you like to access?").then((response) => {
		CommandLine.print(response);
	});

	const account = Account.find(accountName);
}

main();
