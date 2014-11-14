
angular.module('formApp')
.controller('formController',['$scope','$http','$stateParams','restApi','shareData','$state' , function($scope,$http,$stateParams,restApi,shareData,$state) {

var formCtrl = this;

formCtrl.getCredentials = function(email,key){
	shareData.credentials.myemail= email;
	shareData.credentials.mykey=key;
}

    }]);