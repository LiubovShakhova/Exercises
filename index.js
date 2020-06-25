'use strict';
document.addEventListener('DOMContentLoaded', () => {

const startButton = document.getElementById('start'),
    cancelButton = document.getElementById('cancel'),
    incomeAddButton = document.getElementsByTagName('button')[0],
    expensesAddButton = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],

    salaryAmount = document.querySelector('.salary-amount'),
    additionalIncomeItem1 = document.getElementsByClassName('additional_income-item')[0],
    additionalIncomeItem2 = document.getElementsByClassName('additional_income-item')[1],
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('input#period-select'),
    periodAmount = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    incomeTitle = document.querySelector('input.income-title');


class AppData {
    constructor() {
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
    }
  
    isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    check() {
      if (salaryAmount.value !== '') {
        startButton.removeAttribute('disabled');
      }
    }

    start() {
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
    }

    canceled() {
      document.querySelectorAll('.data input[type=text]').forEach(function(item) {
        item.disabled = true;
      });
      startButton.style.display = 'none';
      cancelButton.style.display = 'block';
    }

    showResult() {
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
    }

    getExpensesBlock(){
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
      expensesItems = document.querySelectorAll('.expenses-items');
      for (let i = 0; i < cloneExpensesItem.childNodes.length; i++) {
        cloneExpensesItem.childNodes[i].value = '';
      }
      if (expensesItems.length === 3) {
        expensesAddButton.style.display = 'none';
      }
    }

    getExpenses() {
      expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== '') {
          this.expenses[itemExpenses] = cashExpenses;
        }
      });
    }

    getIncomeBlock() { 
      let cloneIncomeItems = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAddButton);
      incomeItems = document.querySelectorAll('.income-items');
      for (let i = 0; i < cloneIncomeItems.childNodes.length; i++) {
        cloneIncomeItems.childNodes[i].value = '';
      }
      if (incomeItems.length === 3) {
        incomeAddButton.style.display = 'none';
      }
    }

    getIncome() {
      incomeItems.forEach((item) => {
        incomeTitle = document.querySelector('input.income-title').value;
        let incomeAmount = document.querySelector('.income-amount').value;

        if (incomeTitle !== '' && incomeAmount !== '') {
          this.income[incomeTitle] = incomeAmount;
        }
      });
      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    }

    getAddExpenses() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
          this.addExpenses.push(item);
        }
      });
    }

    getAddIncome() {
      additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
      });
    }

    getExpensesMonth() {
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }
    }

    getBudget() {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
      return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getStatusIncome() {
      if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
      } else if ( this.budgetDay > 600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
      } else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
      } else {
        return ('Что то пошло не так');
      }
    }

    getInfoDeposit(){
      if(this.deposit) {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
        while (!this.isNumber(this.percentDeposit)) {
          this.percentDeposit = prompt('Какой годовой процент?', 10);
        }
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        while (!this.isNumber(this.moneyDeposit)) {
          this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
      }
    }

    calcSavedMoney() {
      return this.budgetMonth * periodSelect.value;
    }

    changePeriod() {
        let periodAmount = document.querySelector('#period-amount');
        periodAmount.textContent = periodSelect.value;
    }

    reset() {
        let textInputs = document.querySelectorAll('.data input[type = text]'),
            resultInputs = document.querySelectorAll('.result input[type = text]');
            
        textInputs.forEach((elem) => {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = 0;
            periodAmount.innerHTML = periodSelect.value;
        });
        resultInputs.forEach((elem) => {
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
    }

    EventListener() {
      startButton.addEventListener('click', appData.start.bind(appData));
      expensesAddButton.addEventListener('click', appData.getExpensesBlock);
      incomeAddButton.addEventListener('click', appData.getIncomeBlock);
      periodSelect.addEventListener('input', appData.changePeriod);
      cancelButton.addEventListener('click', appData.reset.bind(appData));
      salaryAmount.addEventListener('keyup', appData.check);
    }
}

const appData = new AppData();
appData.EventListener();
console.log(appData);

});




