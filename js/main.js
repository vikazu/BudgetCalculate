let startBtn = document.getElementById('start'),
    budgetValue = document.querySelector('.budget-value'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),
    expensesItem = document.querySelectorAll('.expenses-item'),
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    expensesItemBtn = document.querySelector('.expenses-item-btn'),
    optionalExpensestBtn = document.querySelector('.optionalexpenses-btn'),
    countBudgetBtn = document.querySelector('.count-budget-btn'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    income = document.getElementById('income'),
    savings = document.getElementById('savings'),
    sumV = document.getElementById('sum'),
    percentV = document.getElementById('percent'),
    sumExpenses = 0;

let money, time;

startBtn.addEventListener('click',function(){
    time = prompt('Enter date in format YYYY-MM-DD');
    money = +prompt('Your monthly budget');

    while(isNaN(money) || money == '' || money == null){
        money = +prompt('Your monthly budget');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});
    expensesItemBtn.addEventListener('click', function(){
        let sum = 0;
        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
            if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null && b !== "" && a.length < 50) {
                console.log("Done");
                appData.expenses[a] = b;
                sum += +b;
            } else {
                i = i - 1;
            }
        }
        sumExpenses = sum;
        expensesValue.textContent = sum;
    });
    optionalExpensestBtn.addEventListener('click', function() {
        for (let i = 0; i < optionalexpensesItem.length; i++) {
            let a = optionalexpensesItem[i].value;

            if (typeof(a) === 'string' && typeof(a) != null && a.length < 50) {

                appData.optionalExpenses[i] = a;
                optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';

            } else {
                i = i - 1;
            }
        }
    });
countBudgetBtn.addEventListener('click', function(){
    if (appData.budget != undefined && appData.budget > sumExpenses) {
        appData.moneyPerDay = ((appData.budget - sumExpenses) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "minimum income";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "average income";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "high income";
        } else {
            levelValue.textContent = "error!";
        }
    }else{
        daybudgetValue.textContent = 'error! Click the button "Start"!';
    }
});
income.addEventListener('input', function(){
    let items = income.value;
    if (typeof(items) === 'string' && typeof(items) != null) {
        appData.income = items.split(', ');
        incomeValue.textContent = appData.income;
    }
});

savings.addEventListener('click', function(){
if(appData.savings == true){
    appData.savings = false;
}else{
    appData.savings = true;
}
});
sumV.addEventListener('input', function () {
    if(appData.savings == true){
        let sum = +sumV.value,
            percent = +percentV.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);

    }
});
percentV.addEventListener('input', function () {
    if(appData.savings == true){
        let sum = +sumV.value,
            percent = +percentV.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);

    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses:{},
    income: [],
    savings: false,
    chooseExpenses: {},
    detectDayBudget: function () {

        alert("Daily budget: " + appData.moneyPerDay);
    },
    detectLevel: {},
    savingsIncome: {},
    chooseOptExpenses: {},
    chooseIncome: function() {
        let items = prompt ('What is your extra income? (Enter items separated by commas)', '');
        if (typeof(items) === 'string' && typeof(items) != null){
            appData.income = items.split(', ');
            appData.income.push(prompt('Maybe something else?', ''));
            appData.income.sort();
        }
        appData.income.forEach(function(item, i){
            console.log(i+1 + ":" + item);
        });
    }
};

for (let key in appData){
    console.log("our program includes such data: " + key + " is " + appData[key]);
}