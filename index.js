'use strict';

let startButton = document.getElementById('start');
let incomeAddButton = document.getElementsByTagName('button')[0];
let expensesAddButton = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let additionalIncomeItem1 = document.getElementsByClassName('additional_income-item')[0];
let additionalIncomeItem2 = document.getElementsByClassName('additional_income-item')[1];
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
//AppData
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit:0,
  moneyDeposit:0,
  mission: 50000,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  period: 3,
  start: function() {
    /* do {
      money = prompt('Ваш месячный доход?');
    } 
    while (!isNumber(money)); */
    if (salaryAmount.value === '') {
      alert('Ошибка! Поле " Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = salaryAmount.value;
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getBudget();
    
    appData.showResult();
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
  },
  getExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesAddButton.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
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

    if(confirm('Есть ли у Вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
      while (/[0-9.,:]/.test(itemIncome)) {
        itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
      }
      let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000); 
      
      while (!isNumber(cashIncome)) {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000); 
      }
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'internet, rent');
    //Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с большой 
    appData.addExpenses = addExpenses.split().join(', ');
    appData.addExpenses = addExpenses.split('')[0].toUpperCase() + addExpenses.slice(1);
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
  },
  getInfoDeposit: function(){
    if(appData.deposit) {
      appData.percentDeposit = prompt('Какой годовой процент?', 10);
      while (!isNumber(appData.percentDeposit)) {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      while (!isNumber(appData.moneyDeposit)) {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
    }
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

startButton.addEventListener('click', appData.start);
expensesAddButton.addEventListener('click', appData.getExpensesBlock);

/* if (appData.getTargetMonth < 0) {
  console.log(`Цель не может быть достигнута`);  
} else {
  console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + 'месяцев');
}
 */

/* for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key +'-' + appData[key]);
} */

appData.getInfoDeposit();/* 
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney()); */



//console.log(appData.addExpenses);
