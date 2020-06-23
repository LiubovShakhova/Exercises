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

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function(){
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.incomeMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;  
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.check = function() {
  if (salaryAmount.value !== '') {
    startButton.removeAttribute('disabled');
  }
};

AppData.prototype.start = function() {
  if (salaryAmount.value === '') {
      startButton.setAttribute('disabled', 'true');
      return;
    }
  let textInputs = document.querySelectorAll('.data input[type = text]');
  textInputs.forEach(function(elem) {
      elem.setAttribute('disabled', 'true');
  });

  incomeAddButton.setAttribute('disabled', 'true');
  expensesAddButton.setAttribute('disabled', 'true');
  startButton.style.display = 'none';
  cancelButton.style.display = 'block';

  this.budget = +salaryAmount.value;
  this.getIncome();
  this.getExpenses();
  this.getExpensesMonth(); 
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.changePeriod();
  this.showResult();
  this.canceled();
};

AppData.prototype.canceled = function() {
  document.querySelectorAll('.data input[type=text]').forEach(function(item) {
    item.disabled = true;
  });
  startButton.style.display = 'none';
  cancelButton.style.display = 'block';
};

AppData.prototype.showResult = function() {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcSavedMoney();
  //После нажатия кнопки рассчитать, если меняем ползунок в range, “Накопления за период” меняются динамически
  periodSelect.addEventListener('change', function() {
      incomePeriodValue.value = _this.calcSavedMoney();
  });
};

AppData.prototype.getExpensesBlock = function(){
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
  expensesItems = document.querySelectorAll('.expenses-items');
  expensesItems.forEach (function(item) {
    item.value = '';
  });
  if (expensesItems.length === 3) {
    expensesAddButton.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function() {
  const _this = this;
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;

    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

AppData.prototype.getIncomeBlock = function() { 
  let cloneIncomeItems = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAddButton);
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    incomeAddButton.style.display = 'none';
  }
};

AppData.prototype.getIncome = function() {
  const _this = this;
  incomeItems.forEach(function(item) {
    incomeTitle = document.querySelector('input.income-title').value;
    let incomeAmount = document.querySelector('.income-amount').value;

    if (incomeTitle !== '' && incomeAmount !== '') {
      _this.income[incomeTitle] = incomeAmount;
    }
  });
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function() {
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function(item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function() {
  const _this = this;
  additionalIncomeItem.forEach(function(item) {
    let itemValue = item.value.trim();
    
    if (itemValue !== '') {
        _this.addIncome.push(itemValue);
    }
  });
}; 

AppData.prototype.getExpensesMonth = function() {
  for (let key in appData.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
}; 

AppData.prototype.getTargetMonth = function() {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() {
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if ( this.budgetDay > 600 && this.budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};

AppData.prototype.getInfoDeposit = function(){
  if(this.deposit) {
    this.percentDeposit = prompt('Какой годовой процент?', 10);
    while (!isNumber(this.percentDeposit)) {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
    }
    this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    while (!isNumber(this.moneyDeposit)) {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    }
  }
};

AppData.prototype.calcSavedMoney = function() {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changePeriod = function() {
    let periodAmount = document.querySelector('#period-amount');
    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.reset = function() {
    let textInputs = document.querySelectorAll('.data input[type = text]'),
        resultInputs = document.querySelectorAll('.result input[type = text]');
        
    textInputs.forEach(function(elem) {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = 0;
        periodAmount.innerHTML = periodSelect.value;
    });
    resultInputs.forEach(function(elem) {
      elem.value = '';
    });

    for(let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomeAddButton.style.display = 'block';
    }
    for(let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesAddButton.style.display = 'block';
    }
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.incomeMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;  
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

    depositCheck.checked = false;
    startButton.style.display = 'block';
    cancelButton.style.display = 'none';
    incomeAddButton.removeAttribute('disabled');
    expensesAddButton.removeAttribute('disabled');
};

AppData.prototype.EventListener = function() {
  startButton.addEventListener('click', appData.start.bind(appData));
  expensesAddButton.addEventListener('click', appData.getExpensesBlock);
  incomeAddButton.addEventListener('click', appData.getIncomeBlock);
  periodSelect.addEventListener('input', appData.changePeriod);
  cancelButton.addEventListener('click', appData.reset.bind(appData));
  salaryAmount.addEventListener('keyup', appData.check);
};

const appData = new AppData();
appData.EventListener();
console.log(appData);






