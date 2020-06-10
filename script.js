'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 300;
let income = 'freelancer monthly income is 300$';
let addExpenses = 'Internet, Taxi, Payments';
let deposit = true;
let mission = 10000;
let period = 3;
var accumulatedMonth;

//Переписать функцию start циклом do while
let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } 
  while (!isNumber(money));
};

start();
//вызовы функции showTypeOf
let showTypeOf = function(data) {
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let budgetDay = money / 30;

//Вывод возможных расходов в виде массива (addExpenses)
console.log(addExpenses.toLowerCase().split(', '));

//money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'internet, rent');
deposit = confirm('Есть ли у вас депозит в банке?');

/* let expenses1 = prompt('Введите обязательную статью расходов?', 'internet');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?', 'rent');
let amount2 = +prompt('Во сколько это обойдется?');
 */


//Расходы за месяц вызов getExpensesMonth
let expenses = [];
let sum = 0;
let getExpensesMonth = function() {

  for ( let i = 0; i < 2; i++) {
  expenses[i] = prompt('Введите обязательную статью расходов?');
  sum += +prompt('Во сколько это обойдется?');
  if (!isNumber(sum)) {
    sum = +prompt('Во сколько это обойдется?');
  }
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

function getAccumulatedMonth() {
  return money - sum;
}
var accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц:', accumulatedMonth);

let budgetMonthCounter = Math.ceil(mission / accumulatedMonth);

//Бюджет на день (budgetDay)
budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`дневной бюджет: ${budgetDay}`);

//вызов функции getStatusIncome
let getStatusIncome = function() {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if ( budgetDay > 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay <= 600 && budgetDay >= 0) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};
console.log(getStatusIncome());

//Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 
let target;
const getTargetMonth = function(){
  target = Math.ceil(mission / accumulatedMonth);
  return;
};
if (target < 0) {
  console.log(`Цель не может быть достигнута`);  
} else {
  console.log(`за ${target} месяцев будет достигнута цель`);
}
getTargetMonth();








