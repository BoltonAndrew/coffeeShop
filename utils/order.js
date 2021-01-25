/*jshint esversion:8*/
const fs = require('fs');

const loadOrder = () => {
    try {
        const dataBuffer = fs.readFileSync("src/order.json");
        const orderJson = dataBuffer.toString();
        return JSON.parse(orderJson);
    } catch (error) {
        return [];
    }
};

const addCoffee = (myName, myCoffee) => {
    const allCoffee = loadOrder();
    allCoffee.push({ [myName]: myCoffee });
    saveOrder(allCoffee);
};

const saveOrder = allOrder => {
    const orderJson = JSON.stringify(allOrder);
    fs.writeFileSync("src/order.json", orderJson);
};

const orderList = () => {
    const allCoffee = loadOrder();
    allCoffee.map((coffee) => {
        console.log(coffee);
    });
};

const removeCoffee = coffeeToRemove => {
    const allCoffee = loadOrder();
    try {
        const removedItem = allCoffee.splice(coffeeToRemove - 1, 1);
        console.log(`Successfully removed ${removedItem[0]}`);
    } catch (error) {
        console.log("No entry found there");
    }

    saveOrder(allCoffee);
};

module.exports = {
    addCoffee,
    orderList,
    removeCoffee,
};