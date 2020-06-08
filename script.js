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

//Lesson03

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = +money -(amount1 + amount2);
console.log(`бюджет на месяц: ${budgetMonth}`);

let budgetMonthCounter = Math.ceil(mission / budgetMonth);
console.log(`за ${budgetMonthCounter} месяцев будет достигнута цель`);

budgetDay = Math.floor(budgetMonth / 30);
console.log(`дневной бюджет: ${budgetDay}`);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay === 0) {
  console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}
