//we do this funtion to make sure our variables don't bleed outside of the app into global scope
(function () {
'use strict';	

// here we define our application and bound to html tag in out html file
angular.module('checkOffApp', [])

//this is a controller that responsible for our view and it bounds to the div in html file
.controller('MyFirstController', function ($scope) {
	

});

})();