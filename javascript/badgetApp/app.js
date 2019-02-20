// BUDGET CONTROLLER 
var budgetController = (function (UICtrl, AppCtrl) {

    var Expense = function (id, description, value) {
        this.id= id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
        sum += cur.value;
    });
    data.totals[type] = sum;
    } 

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    

    return {
        addItem: function(type, desc, val){
            var newItem, ID;
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem); 
            // Return the new element
            return newItem;
        
        },

        calculateTotals: function(){
            // Calculate budget
            
            calculateTotal('exp');
            calculateTotal('inc');
            data.budget = data.totals.inc - data.totals.exp;
            // get budget 
              
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        }, 

        getBudget: function(){
            return {
                budget : data.budget,
                income : data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        }
    };
})(UIController, controller);

// UI CONTROLLER
var UIController = (function (budgetCtrl, AppCtrl) {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer:'.expenses__list',
        totalIncome:'.budget__income--value',
        totalExpense:'.budget__expenses--value',
        totalBudget:'.budget__value'
    }

    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
      
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
 
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type == 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };
    

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp 
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        addListItem : function(type, item){
            // Create HTML string with placeholder text
            var html, newHtml, element; 
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%this%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%this%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Replace the placeholder text with some actual data 
            // insert the html into the DOM 
            newHtml = html.replace('%id%', item.id);
            newHtml = newHtml.replace('%description%', item.description);
            var number = formatNumber(item.value, type); 
            newHtml = newHtml.replace('%this%', number);
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml); 
            
        }, 
        clearFields : function(){
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array ){
                current.value = " "; 
            })
            fieldsArr[0].focus();
        },
        updateTotals : function(data){
            document.querySelector(DOMstrings.totalExpense).textContent = formatNumber(data.totals.exp, 'exp');
            document.querySelector(DOMstrings.totalIncome).textContent = formatNumber(data.totals.inc, 'inc');
            var type;
            data.budget > 0 ? type = 'inc' : type = 'exp'; 
            document.querySelector(DOMstrings.totalBudget).textContent = formatNumber(data.budget, type); 
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }
})(budgetController, controller);

// GLOBAL APP CONTROLLER 
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.key == 'Enter') {
                ctrlAddItem();
            }
        });
    };
    var ctrlAddItem = function () {
        // TO DO   
        var input, newItem, type; 
        input = UICtrl.getInput();
        // 1. Get input data and add to the total 
        newItem = budgetController.addItem(input.type, input.description, input.value); 
        UIController.addListItem(input.type, newItem);

        UIController.clearFields();
        // calculate and update budget 
        updateBudget();
    };

    var updateBudget = function () {
        // calculate the budget

        // return the budget

        // display the budget 

    }

    return {
        init: function () {
            setupEventListeners();
        }
    }
})(budgetController, UIController);


controller.init();