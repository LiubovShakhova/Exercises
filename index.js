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
let incomeTitle = document.querySelector('input.income-title');
let incomeItems = document.querySelectorAll('.income-items');
let additionalIncomeItem1 = document.getElementsByClassName('additional_income-item')[0];
let additionalIncomeItem2 = document.getElementsByClassName('additional_income-item')[1];
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('input#period-select');
let periodAmount = document.querySelector('.period-amount');

//3)Поля с placeholder="Сумма" разрешить ввод только цифр
document.querySelector('.expenses-amount').addEventListener('keyup', function(){
  this.value = this.value.replace(/[^\d]/g, '');
});
document.querySelector('.income-amount').addEventListener('keyup', function(){
  this.value = this.value.replace(/[^\d]/g, '');
});
//2) Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
document.getElementsByClassName('additional_income-item')[0].addEventListener('keyup', function(){
  this.value = this.value.replace(/[\d a-zA-Z]/g, '');
});
document.getElementsByClassName('additional_income-item')[1].addEventListener('keyup', function(){
  this.value = this.value.replace(/[\d a-zA-Z]/g, '');
});
document.getElementsByClassName('income-title').addEventListener('keyup', function(){
  this.value = this.value.replace(/[\d a-zA-Z]/g, '');
});
document.getElementsByClassName('expenses-title').addEventListener('keyup', function(){
  this.value = this.value.replace(/[\d a-zA-Z]/g, '');
});

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
//AppData
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  incomeMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit:0,
  moneyDeposit:0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function() {
    //Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой
    if (salaryAmount.value === '') {
        startButton.disabled = true;
      }

    appData.budget = +salaryAmount.value;
    appData.getIncome();
    appData.getExpenses();
    appData.getExpensesMonth(); 
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.changePeriod();
    appData.showResult();
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
    //После нажатия кнопки рассчитать, если меняем ползунок в range, “Накопления за период” меняются динамически
    if (appData.start) {
      periodSelect.addEventListener('input', appData.start);
    }
  },
  getExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach (function(item) {
      item.value = '';
    });
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
  getIncomeBlock: function() { 
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAddButton);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomeAddButton.style.display = 'none';
    }
  },
  getIncome: function() {
    /* if(confirm('Есть ли у Вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
      while (/[0-9.,:]/.test(itemIncome)) {
        itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
      }
      let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000); 
      
      while (!isNumber(cashIncome)) {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000); 
      }
      appData.income[itemIncome] = cashIncome;
    } */
    incomeItems.forEach(function(item) {
      incomeTitle = document.querySelector('input.income-title').value;
      let incomeAmount = document.querySelector('.income-amount').value;

      if (incomeTitle !== '' && incomeAmount !== '') {
        appData.income[incomeTitle] = incomeAmount;
      }
    });
    for (let key in appData.income) {
      appData.income += +appData.income[key];
      /* appData.incomeMonth = +appData.income; */
    }
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    return appData.budgetMonth * periodSelect.value;
  },
  changePeriod: function() {
      let periodAmount = document.querySelector('#period-amount');
      periodAmount.textContent = periodSelect.value;
  },

};

startButton.addEventListener('click', appData.start);
expensesAddButton.addEventListener('click', appData.getExpensesBlock);
incomeAddButton.addEventListener('click', appData.getIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);

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
