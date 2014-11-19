
angular.module('formApp')
.controller('editItemController',['$scope','$http','$stateParams','restApi','fileUpload', function($scope,$http,$stateParams,restApi,fileUpload) {

var editCtrl = this;

editCtrl.itemid = $stateParams.item;

getItemID();
function getItemID(){
  restApi.getItemId(editCtrl.itemid)
            .success(function (data) {
                editCtrl.item= data.item[0];                 
              })
            .error(function (error) {
                editCtrl.status = 'Unable to load customer data: ' + error.message;
            });
     
}
 $scope.showContent = function($fileContent){
       editCtrl.item.itempicture = $fileContent;
    };

editCtrl.updateItem=function(){
        var file =  $scope.content;
 		
   

        if(editCtrl.item.newFile != null){
    		editCtrl.item.itempicture =$scope.content;
    	}

	restApi.updateUser(editCtrl.item)

			.success(function () {
                 alert('hizo user');            
            })
            .error(function (error) {
                editCtrl.status = 'Unable to load customer data: ' + error.message;
            });

     restApi.updateItem(editCtrl.item)
     		.success(function () {
                 alert('hizo item');            
            })
            .error(function (error) {
                editCtrl.status = 'Unable to load customer data: ' + error.message;
            });
};
   
editCtrl.updateUser=function(){
	restApi.updateUser(editCtrl.item)

			.success(function () {
                            
            })
            .error(function (error) {
                editCtrl.status = 'Unable to load customer data: ' + error.message;
            });
}







 }]);