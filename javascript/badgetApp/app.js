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

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, desc, val){
            var newItem, ID, arrLength; 
            arrLength = data.allItems[type].length;
            console.log('arrlength is' + arrLength);
            if (arrLength == 0)
            {
                ID = 1
            }
            else 
            {
                ID = data.allItems[type][arrLength-1].id + 1; 
            }

            if(type=='exp'){
                newItem = new Expense(ID,desc,val);
            }else if(type=='inc'){
                newItem = new Income(ID,desc,val);
            }
            data.allItems[type].push(newItem); 
            data.totals[type] += newItem.value; 
            return newItem; 
        }
    };
})(budgetController, controller);

// UI CONTROLLER
var UIController = (function (budgetCtrl, AppCtrl) {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer:'.expenses__list' 
    }
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
            if (type=='inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%y</div> <div class="right clearfix"> <div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }else if(type=='exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Replace the placeholder text with some actual data 
            // insert the html into the DOM 
            newHtml = html.replace('id', item.id); 
            newHtml = newHtml.replace('value', item.value);
            newHtml = newHtml.replace('description', item.description); 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml); 
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
        var input, newItem; 
        input = UICtrl.getInput();
        // 1. Get input data and add to the total 
        newItem = budgetController.addItem(input.type, input.description, input.value); 
        budgetController.addItem(newItem);
        // 2. Add the item and display it to UI  
        // 3. Display the total 
    };

    return {
        init: function () {
            setupEventListeners();
        }
    }
})(budgetController, UIController);


controller.init();