/*jshint esversion:8*/
const figlet = require('figlet');
const inquirer = require('inquirer');
const { addCoffee,
    orderList,
    removeCoffee } = require('../utils/order');

const topLevelQuestion = [
    { type: "list", name: "options", message: "What would you like to do?", choices: ["add", "list", "remove", "exit"] } 
];

const nameQuestion = [{ type: "input", name: "name", message: "Who's coffee is this?" }];

const coffeeSizeQuestion = [
    { type: "list", name: "size", message: "What size drink would you like?", choices: ["Short", "Tall", "Grande", "Venti"] }
];

const coffeeTypeQuestion = [
    { type: "list", name: "type", message: "What type of drink would you like?", choices: ["Black", "Latte", "Cappucccino", "Americano", "Espresso", "Macchiato", "Mocha", "Flat White", "Tea"] }
];

const removeDrink = [{ type: "number", name: "remove", message: "Which would you like to remove? Please type a number" }];

const main = () => {
    console.log(figlet.textSync("Coffee Order", { font: "isometric1" }));
    app();
};

const app = async () => {
    const answers = await inquirer.prompt(topLevelQuestion);
    if (answers.options == "add") {
        const name = await inquirer.prompt(nameQuestion);
        const type = await inquirer.prompt(coffeeTypeQuestion);
        const drink = await inquirer.prompt(coffeeSizeQuestion);
        const fullDrink = `${type.type} ${drink.size}`;
        addCoffee(name.name, fullDrink);
        console.log("adding a drink...");
        app();
    } else if (answers.options == "list") {
        orderList();
        app();
    } else if (answers.options == "remove") {
        orderList();
        const answer = await inquirer.prompt(removeDrink);
        removeCoffee(answer.remove);
        console.log("removing a drink...");
        app();
    } else if (answers.options == "exit") {
        console.log("ok, no coffee for you");
    }
};

main();