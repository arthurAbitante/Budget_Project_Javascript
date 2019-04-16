var budgetController = (function() {

	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	}
	
	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	}
	
	var allExpenses = [];
	var allIncomes = [];
	var totalExpenses = 0;
	
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
		
		};
		
	return {
		addItem: function(type, des, val) {
			var newItem, ID;
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}else{
				ID = 0;
			}
			
			if(type === 'exp'){
				newItem = new Expense(ID, des, val);
			}else if(type === 'inc'){
				newItem = new Income(ID, des, val);
			}
			data.allItems[type].push(newItem);
			return newItem;
		}
	};
		

})();

var UIController = (function(){
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add_description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	};
	
	
	return {
		getInput: function(){
			return {
				type: document.querySelector(DOMstrings.inputType).type,
				description: document.querySelector(DOMstrings.inputDescription).description,
				value: document.querySelector(DOMstrings.inputValue).value
			};
		},
		addListItem: function(obj, type){
			var html, newHtml, element;
			if(type === 'inc'){
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> <div class="item clearfix" id="income-1"><div class="item__description">Sold car</div><div class="right clearfix"><div class="item__value">+ 1,500.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}else if(type === 'exp'){
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}
			
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);
			
			document.querySelector(element).insertAdjacentHTML('beforeend',html);
		},
		clearFields: function(){
			var fields;
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
		},
		getDOMstrings: function(){
			return DOMstrings;
		}
	};

})();


var controller = (function(budgetCtrl, UICtrl) {
	
	var setupEventListeners = function() {
	var DOM = UICtrl.getDOMstrings();
	document.querySelector(DOM.inputBtn).addEventListener('click', function(){
		ctrlAddItem();
	});
	
	document.addEventListener('keypress', function(event) {
		if(event.keyCode === 13 || event.which === 13){
			//enter
		}
	});
		
		
		
	};
	
	


	var ctrlAddItem = function(){
		var input, newItem;
		
		input = UICtrl.getInput();
		
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		UICtrl.addListItem(newItem, input.type);
	};

	return {
		init: function(){
			setupEventListeners();
		}	
	};
	
})(budgetController, UIController);

controller.init();
