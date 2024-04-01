#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
let myBalance = 10000;
let myPin = 1234;
async function welcome() {
    let title = chalkAnimation.rainbow("\n \tWelcome to code With Saad - ATM Machine\n");
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
    title.stop();
}
await welcome();
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("Enter your pin code"),
        type: "number",
    },
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\npin is Correct, Login Successfully!\n"));
    let oprationANS = await inquirer.prompt([
        {
            name: "operation",
            message: chalk.yellow("Select an operation"),
            type: "list",
            choices: ["withdraw", "check balance"],
        },
    ]);
    if (oprationANS.operation === "withdraw") {
        let withdrawANS = await inquirer.prompt([
            {
                name: "withdraw",
                message: chalk.yellow("Select a withdraw method"),
                type: "list",
                choices: ["Fast Cash", "Enter Amount"],
            },
        ]);
        if (withdrawANS.withdraw === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "FastCash",
                    message: "Select amount",
                    type: "list",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000],
                },
            ]);
            if (fastCashAns.FastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance!"));
            }
            else {
                myBalance -= fastCashAns.FastCash;
                console.log(chalk.gray(`${fastCashAns.FastCash} Withdraw Successfully`));
                console.log(chalk.bgBlue(`Your Remaining Balance is: ${myBalance}`));
            }
        }
        else if (withdrawANS.withdraw === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter your amount",
                    type: "number",
                },
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficiant Balance!"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.gray(`${amountAns.amount} Withdraw Successfully`));
                console.log(chalk.bgBlue(`Your Remaining Balance is: ${myBalance}`));
            }
        }
    }
    else if (oprationANS.operation === "check balance") {
        console.log(chalk.bgGrey(`Your Account Balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.greenBright("pin is incorrect, Try Again"));
}
