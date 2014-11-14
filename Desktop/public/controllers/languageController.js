
angular.module('formApp')
.controller('languageController',['$scope', 'translationService', 
	function ($scope, translationService){  

	// this is my controller forward declaration.
	// this implicitly applies the scope to the controller
	var vm = this;
	vm.translations = {};
	vm.language = "en";
	vm.translate = translatePage;
	vm.onchangeLanguage = onchangeLanguage;


	// Invoke initialization.
	activate();

	// Initialization method for the controller.
	function activate()
	{
		vm.translate(vm.language);
	}

    // load the resource from json service
  	function translatePage(language)
  	{
	    translationService.getTranslation($scope,language).get(function (data)
		{
			vm.translations = data;
		});
	}

	// event handler for language change
	function onchangeLanguage()
	{
		vm.translate(vm.language);
	}
  
}]);



