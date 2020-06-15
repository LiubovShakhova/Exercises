'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function() {
      do {
        money = prompt('Ваш месячный доход?');
      } 
      while (!isNumber(money));
      return;
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
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'internet, rent');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let message;
    for ( let i = 0; i < 2; i++) {
      const question = prompt('Введите обязательную статью расходов?');
      do { 
        message = prompt('Во сколько это обойдется?');
      } while (!isNumber(message));
      
      appData.expenses[question] = message;
      } 
  },
  getTargetMonth: function() {
    return Math.ceil(appData.mission / appData.budgetMonth);
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
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц:' + appData.expensesMonth);

if (appData.getTargetMonth < 0) {
  console.log(`Цель не может быть достигнута`);  
} else {
  console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + 'месяцев');
}

console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key +'-' + appData[key]);
}








