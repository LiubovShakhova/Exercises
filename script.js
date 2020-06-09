'use strict';

let money = 300;
let income = 'freelancer monthly income is 300$';
let addExpenses = 'Internet, Taxi, Payments';
let deposit = true;
let mission = 10000;
let period = 3;
var accumulatedMonth;

//вызовы функции showTypeOf
let showTypeOf = function(data) {
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let budgetDay = money / 30;

//Вывод возможных расходов в виде массива (addExpenses)
console.log(addExpenses.split(', '));

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'internet, rent');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?', 'internet');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?', 'rent');
let amount2 = +prompt('Во сколько это обойдется?');



//Расходы за месяц вызов getExpensesMonth
const getExpensesMonth = function() {
  return amount1 + amount2;
};
getExpensesMonth();
console.log(getExpensesMonth);

function getAccumulatedMonth() {
  return money -(amount1 + amount2);
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
    console.log('У вас высокий уровень дохода');
  } else if ( budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay <= 600 && budgetDay >= 0) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
  } else {
    console.log('Что то пошло не так');
  }
};
getStatusIncome();

//Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 
let target;
const getTargetMonth = function(){
  target = Math.ceil(mission / accumulatedMonth);
  return;
};
getTargetMonth();

if (target <= 0) {
  console.log(`Цель не может быть достигнута`);  
} else {
  console.log(`за ${target} месяцев будет достигнута цель`);
}






