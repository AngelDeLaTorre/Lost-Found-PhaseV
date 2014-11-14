angular.module('formApp')
.controller('adminSettingsController',['$scope','$http','restApi','$timeout', function($scope,$http,restApi,$timeout) {
var settingCtrl = this;
settingCtrl.firstname ="";
settingCtrl.userObject={};
settingCtrl.admins = {};
settingCtrl.status = {};



  getAdmins();  

  settingCtrl.getUserObject = function (object){
      var x = Math.floor((Math.random() * 999) + 1);
   settingCtrl.userObject=object;
   settingCtrl.userObject.isblocked='false';
   settingCtrl.userObject.isadmin='true';
    settingCtrl.userObject.passkey = x;
   postUser(object);
  };

  function postUser(object) {
        
        restApi.postUser(object)
            .success(function (data) {
              alert('good');
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
           
    };

	function getAdmins() {
        restApi.getAdmins()
            .success(function (data) {
              
                settingCtrl.admins = data.users;
              })
            .error(function (error) {
                settingCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    };


settingCtrl.selectToRemoveAdmin= function(){
  angular.forEach(settingCtrl.admins, function (user) {
            if(user.Selected){
              
              restApi.removeAdmin(user.email)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                settingCtrl.status = 'Unable to load customer data: ' + error.message;
            });

            }
        });

};



             
	
}]);