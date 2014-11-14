angular.module('formApp')
.controller('helpController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData){
var helpCtrl = this;

helpCtrl.users = {};


helpCtrl.getUser = function(){
	 restApi.getUsers()
            .success(function (data) {
              
                helpCtrl.users = data.users;
              })
            .error(function (error) {
                helpCtrl.status = 'Unable to load customer data: ' + error.message;
            });
 
  angular.forEach(helpCtrl.users, function (user) {
  				if(helpCtrl.helpEmail === user.email)
  				{
  					alert(helpCtrl.helpEmail)
  					restApi.resetKey(helpCtrl.helpEmail)
           			 .success(function (data) {
              
                
		              })
		            .error(function (error) {
		                helpCtrl.status = 'Unable to load customer data: ' + error.message;
		            });


  				}
  				
            
        });

};




}]);
