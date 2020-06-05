'use strict';

let money = 300;
//console.log(typeof money);
let income = 'freelancer monthly income is 300$';
//console.log(typeof income);
let addExpenses = 'Internet, Taxi, Payments';
//console.log(typeof addExpenses);
let deposit = true;
//console.log(typeof deposit);
let mission = 1000;
//console.log(typeof mission);
let period = 3;
//console.log(typeof period);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

let budgetDay = money / 30;
console.log(budgetDay);
