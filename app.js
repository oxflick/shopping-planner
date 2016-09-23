//we do this funtion to make sure our variables don't bleed outside of the app into global scope
(function () {
'use strict';	

// here we define our application and bound to html tag in out html file
angular.module('checkOffApp', [])

//this is a controller that responsible for our view and it bounds to the div in html file
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var itemToBuy = this;
  itemToBuy.items = ShoppingListCheckOffService.getItems();

  itemToBuy.removeItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.removeItem(itemIndex);
    }  catch (error) {
      itemToBuy.errorMessage = error.message;
    }
  };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.showBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // Shopping List of items to buy
  var items = [
  {
  	name: "cookie",
  	quantity: 2
  },
  {
  	name: "tea",
  	quantity: 1
  },
  {
  	name: "banana",
  	quantity: 5
  },
  {
  	name: "bread",
  	quantity: 1
  },
  {
  	name: "tomatoes",
  	quantity: 10
  }

  ];

  // Bought list of shopping items 
  var boughtitems = [];

  // after button "bought" pressed remove the item from shopping list and add to the bought list
  service.removeItem = function (itemIdex) {
    boughtitems.push(items[itemIdex]);
    items.splice(itemIdex, 1);
    if (items.length == 0) {
    throw new Error("Everything is bought");
    }
  };

  //show items in To Buy List 
  service.getItems = function () {
    return items;
  };

  // show items in "Already Bought List"
  service.showBoughtItems = function () {
    return boughtitems;  
  };

  
}


})();