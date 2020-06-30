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
    depositBank = document.querySelector('.deposit-bank'),
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
      this.getExpInc();
      this.getExpensesMonth(); 
      this.getAddExpenses();
      this.getAddIncome();
      this.getInfoDeposit();
      this.getBudget();
      this.changePeriod();
      this.showResult();
      this.canceled();
      this.saveLocalStorage();
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

    getExpInc() {
      const count = item => {
        const startStr = item.className.split('-')[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if (itemTitle !== '' && itemAmount !== '') {
          this[startStr][itemTitle] = itemAmount;
        }
      };

      incomeItems.forEach(count);
      expensesItems.forEach(count);
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
      let result = 0;
      for (const key in this.expenses) {
        result += +this.expenses[key];
      }
      this.expensesMonth = result;
      return result;
    }

    getBudget() {
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
        this.depositHandler();

        localStorage.removeItem('data');
        document.cookie = 'data=json; expires=Mo, 08 Jun 2020 00:00:00 GMT';
        document.cookie = 'isLoad=true; expires=Mo, 08 Jun 2020 00:00:00 GMT';
    }

    getInfoDeposit(){
      if(this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
      }
    }

    changePercent() {
      const valueSelect = this.value;
      if (valueSelect === 'other') {
        depositPercent.style.display = 'inline-block';
      } else {
          depositPercent.value = valueSelect;
          this.percentDeposit = depositPercent.value;
          depositPercent.style.display = 'none';
          depositAmount.value = '';
      }
    }

    depositHandler() {
      if(depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
      } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display= 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
      }
    }

    saveLocalStorage() {
    let allInputsRight = {
      budgetMonthValue: budgetMonthValue.value,
      budgetDayValue: budgetDayValue.value,
      expensesMonthValue: expensesMonthValue.value,
      additionalExpensesValue: additionalExpensesValue.value,
      additionalIncomeValue: additionalIncomeValue.value,
      targetMonthValue: targetMonthValue.value,
      incomePeriodValue: incomePeriodValue.value,
      depositAmount: depositAmount.value,
      depositPercent: depositPercent.value
      };
      
      let json = JSON.stringify(allInputsRight);
      localStorage.setItem('data', json);
      document.cookie = 'data=json';
      document.cookie = 'isLoad=true';
    }

    getLocalStorage() {
      const allInputsRight = JSON.parse(localStorage.getItem('data'));
      const cookie = document.cookie.split('; ');

      if (allInputsRight && cookie[0] === 'data=json' && cookie[1] === 'isLoad=true') {
            const allInputs = document.querySelectorAll('[class$="-value"]');
            let i = 0;

            for (let key in allInputsRight) {
                allInputs[i].value = allInputsRight[key];
                i++;
            }
      } else {
          document.cookie = 'data=json; expires=Mo, 08 Jun 2020 00:00:00 GMT';
          document.cookie = 'isLoad=true; expires=Mo, 08 Jun 2020 00:00:00 GMT';
          localStorage.removeItem('data');
          this.reset();
        }
    }

    EventListener() {
      startButton.addEventListener('click', this.start.bind(this));
      expensesAddButton.addEventListener('click', this.getExpensesBlock);
      incomeAddButton.addEventListener('click', this.getIncomeBlock);
      periodSelect.addEventListener('input', this.changePeriod);
      cancelButton.addEventListener('click', this.reset.bind(this));
      salaryAmount.addEventListener('keyup', this.check);
      depositCheck.addEventListener('change', this.depositHandler.bind(this));
      depositPercent.addEventListener('change', () => {
        if (!this.isNumber(depositPercent.value) || depositPercent.value > 100 || depositPercent.value <= 0) {
          alert('Введите корректное значение в поле проценты');
          startButton.disabled = true;
          depositPercent.value = '';
          startButton.disabled = false;
        }
      });
      document.addEventListener('DOMContentLoaded', this.getLocalStorage.bind(this));
    }
}

const appData = new AppData();
appData.EventListener();
});




