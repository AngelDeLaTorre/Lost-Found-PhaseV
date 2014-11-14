angular.module('formApp')

.controller('adminUsersController',['$scope','$http','restApi','shareData','$timeout', function($scope,$http,restApi,shareData,$timeout) {
  
  var userCtrl = this;
  userCtrl.users ={};
  userCtrl.searchUserEmail = {};
  userCtrl.status = {};
  userCtrl.setValue = setValue;
  userCtrl.getSelected = {};


  // Invoke initialization.
  activate();

  // Initialization method for the controller.
  function activate()
  {
    getUser();
  };
  
  $scope.login = function() {
    $rootScope.loggedInUser = $scope.username;
    
  };

	function getUser() {
        restApi.getUsers()
            .success(function (data) {
              
                userCtrl.users = data.users;
              })
            .error(function (error) {
                userCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }; 

 // we will store all of our form data in this object
   
  function setValue(e){
    userCtrl.searchUserEmail = e;
    getUserAdmin();
 
  }

  function getUserAdmin(){
    restApi.getUserAdmin(userCtrl.searchUserEmail)
            .success(function (data) {
              
                userCtrl.users = data.anUser;
              })
            .error(function (error) {
                userCtrl.status = 'Unable to load customer data: ' + error.message;
            });

};

userCtrl.getSelectedForBlock= function(){
  angular.forEach(userCtrl.users, function (user) {
            if(user.Selected){
              
              restApi.blockAdminUser(user.email)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                userCtrl.status = 'Unable to load customer data: ' + error.message;
            });

            }
        });

};
userCtrl.getSelectedForUNBlock= function(){
  angular.forEach(userCtrl.users, function (user) {
            if(user.Selected){
              
        restApi.unblockAdminUser(user.email)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                userCtrl.status = 'Unable to load customer data: ' + error.message;
            });

            }
        });  
  $scope.login = function() {
    $rootScope.loggedInUser = $scope.username;
    
  };



};

           
	
}]);
