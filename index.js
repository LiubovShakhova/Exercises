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
  check: function() {
    if (salaryAmount.value !== '') {
      startButton.removeAttribute('disabled');
    }
  },
  start: function() {
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
  },
  getExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    expensesItems = document.querySelectorAll('.expenses-items');
    for (let i = 0; i < cloneExpensesItem.childNodes.length; i++) {
        cloneExpensesItem.childNodes[i].value = '';
      }
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
    for (let i = 0; i < cloneIncomeItems.childNodes.length; i++) {
        cloneIncomeItems.childNodes[i].value = '';
      }
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
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay =  Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if ( this.budgetDay > 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },
  getInfoDeposit: function(){
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
  },
  //Метод reset должен всю программу возвращать в исходное состояние
  reset: function() {
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
  },
  calcSavedMoney: function() {
    return this.budgetMonth * periodSelect.value;
  },
  changePeriod: function() {
      let periodAmount = document.querySelector('#period-amount');
      periodAmount.textContent = periodSelect.value;
  }

};
//1) Привязать контекст вызова функции start к appData 
startButton.addEventListener('click', appData.start.bind(appData));
expensesAddButton.addEventListener('click', appData.getExpensesBlock);
incomeAddButton.addEventListener('click', appData.getIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);
cancelButton.addEventListener('click', appData.reset.bind(appData));
salaryAmount.addEventListener('keyup', appData.check);

//appData.getInfoDeposit();

