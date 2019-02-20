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

    var calcTotal = function (type) {
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

        
        deleteItem: function(type, id) {
            var ids, index;
            
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        calculateTotals: function(){
            // Calculate budget
            calcTotal('exp');
            calcTotal('inc');
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
                expense: data.totals.exp,
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
        delBtn: '.item__delete--btn', 
        incomeContainer: '.income__list',
        container: '.container',
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
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListItem : function(type, item){
            // Create HTML string with placeholder text
            var html, newHtml, element; 
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // Replace the placeholder text with some actual data 
            // insert the html into the DOM 
            newHtml = html.replace('%id%', item.id);
            newHtml = newHtml.replace('%description%', item.description);
            var number = formatNumber(item.value, type); 
            newHtml = newHtml.replace('%value%', number);
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml); 
            
        }, 
        deleteItem: function(elementID) {
            var element = document.getElementById(elementID);
            element.parentNode.removeChild(element);
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
            document.querySelector(DOMstrings.totalExpense).textContent = formatNumber(data.expense, 'exp');
            document.querySelector(DOMstrings.totalIncome).textContent = formatNumber(data.income, 'inc');
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
        document.querySelector(DOM.container).addEventListener('click', ctrlDelItem);

    };
    var ctrlAddItem = function () {
        // TO DO   
        var input, newItem, type; 
        input = UICtrl.getInput();
        if (input.description != "" && !isNaN(input.value) && input.value > 0 ){
        // 1. Get input data and add to the total 
        newItem = budgetController.addItem(input.type, input.description, input.value); 
        UIController.addListItem(input.type, newItem);

        UIController.clearFields();
        // calculate and update budget 
        updateBudget();
        }
    };

    var ctrlDelItem = function(event) {
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            type == 'income' ? type = 'inc' : type = 'exp'; 
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UIController.deleteItem(itemID); 
            
            // 3. Update and show the new budget
            updateBudget();
            
            // 4. Calculate and update percentages
        }
    }; 
    var updateBudget = function () {
        // calculate the budget
        budgetController.calculateTotals();
        var data = budgetController.getBudget(); 
        UIController.updateTotals(data);
    };

    return {
        init: function () {
            setupEventListeners();
        }
    }
})(budgetController, UIController);


controller.init();