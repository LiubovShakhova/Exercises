'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Переписать функцию start циклом do while
let money,
    sum,
    target,
    accumulatedMonth,
    getStatusIncome;
let start = function() {
      do {
        money = prompt('Ваш месячный доход?');
      } 
      while (!isNumber(money));
    };
    start();

//AppData
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  period: 3,
  getExpensesMonth: function() {
    sum = 0;
    for ( let i = 0; i < 2; i++) {
    appData.expenses[i] = prompt('Введите обязательную статью расходов?');
    sum += +prompt('Во сколько это обойдется?');
    if (!isNumber(sum)) {
      sum = +prompt('Во сколько это обойдется?');
    }
    }
    return sum;
  },
  getAccumulatedMonth: function() {
    return appData.budget - sum;
  },
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'internet, rent');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getTargetMonth: function() {
    target = Math.ceil(appData.mission / accumulatedMonth);
  if (target < 0) {
    console.log(`Цель не может быть достигнута`);  
  } else {
    console.log(`за ${target} месяцев будет достигнута цель`);
  }
  },
  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if ( appData.budgetDay > 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  }
};

appData.asking();

let expensesAmount = appData.getExpensesMonth();
console.log('Расходы за месяц: ' +  expensesAmount);

accumulatedMonth = appData.getAccumulatedMonth();
console.log('Накопления за месяц:' + accumulatedMonth);

let budgetMonthCounter = Math.ceil(appData.mission / accumulatedMonth);

//Бюджет на день (budgetDay)
appData.budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`дневной бюджет: ${appData.budgetDay}`);

//вызов функции getStatusIncome

console.log(appData.getStatusIncome());

//Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 

appData.getTargetMonth();








