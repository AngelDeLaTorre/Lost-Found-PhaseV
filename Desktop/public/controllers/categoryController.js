angular.module('formApp')
.controller('categoryController',['$scope','$http','$timeout','restApi','$state', function($scope,$http,$timeout,restApi,$state) {

var categoryCtrl = this;

categoryCtrl.categories = [
	{name:'Bags'},
	{name:'Books'},
	{name:'Clothes'},
	{name:'Electronics'},
	{name:'Tools'},
	{name:'Other'}

];


categoryCtrl.setCategory = function(category){
	
	alert(category.name);
};



           
	
}]);