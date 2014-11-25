angular.module('formApp')
.controller('helpController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData){
var helpCtrl = this;





helpCtrl.SendNewKey = function(message,email){
        
            alert(message);
           

  					restApi.resetKey(email)
           			 .success(function (data) {
              
                
		              })
		            .error(function (error) {
		                helpCtrl.status = 'Unable to load customer data: ' + error.message;
		            });
};

  			
  				
            




}]);
