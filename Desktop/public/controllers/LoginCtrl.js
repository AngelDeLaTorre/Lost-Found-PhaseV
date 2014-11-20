angular.module('formApp').controller('LoginCtrl', ['$scope','$state','$location','$rootScope','restApi' ,function($scope,$state, $location, $rootScope,restApi) {
 var LG= this;
var credentials ={};
LG.response ={};
var flag ;
  LG.login = function() {
    credentials = {'email':LG.username,'key':LG.password,'admin':""};

    restApi.getAuth(credentials)
            .success(function (data) {
              
                LG.admin = data.user[0];
                if(LG.admin != null){
                  if(LG.admin.isadmin == "true" && LG.admin.passkey==credentials.key ) {
                      $rootScope.loggedInUser=true; 
                     // $state.transitionTo('form.admin.adminusers');
                      $location.path("/form/admin/adminusers");
                  }
                   
                }
                  

    

              })
            .error(function (error) {
                LG.status = 'Unable to load customer data: ' + error.message;
            });



  	
  	//$rootScope.loggedInUser=true; 
   
  
  }
  
}]);