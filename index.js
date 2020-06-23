'use strict';

let startButton = document.getElementById('start');
let cancelButton = document.getElementById('cancel');
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
document.querySelector('.income-title').addEventListener('keyup', function(){
  this.value = this.value.replace(/[\d a-zA-Z]/g, '');
});
document.querySelector('.expenses-title').addEventListener('keyup', function(){
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
    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth(); 
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.changePeriod();
    this.showResult();
    this.canceled();
    console.log(this);
  },
  // Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать, после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить, 
  canceled: function() {
    document.querySelectorAll('.data input[type=text]').forEach(function(item) {
      item.disabled = true;
    });
    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    //После нажатия кнопки рассчитать, если меняем ползунок в range, “Накопления за период” меняются динамически
    if (this.start) {
      periodSelect.addEventListener('input', this.start);
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
    incomeItems.forEach(function(item) {
      incomeTitle = document.querySelector('input.income-title').value;
      let incomeAmount = document.querySelector('.income-amount').value;

      if (incomeTitle !== '' && incomeAmount !== '') {
        appData.income[incomeTitle] = incomeAmount;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
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
//1) Привязать контекст вызова функции start к appData 
appData.start = appData.start.bind(appData);

//Метод reset должен всю программу возвращать в исходное состояние
cancelButton.addEventListener('click', function() {
  let inputs = document.querySelectorAll('input');
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
      document.querySelectorAll('.data input[type=text]').forEach(function(item) {
        item.disabled = false;
      });
      startButton.style.display = 'block';
      cancelButton.style.display = 'none';
});
startButton.addEventListener('click', appData.start);
expensesAddButton.addEventListener('click', appData.getExpensesBlock);
incomeAddButton.addEventListener('click', appData.getIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);


appData.getInfoDeposit();/* 

