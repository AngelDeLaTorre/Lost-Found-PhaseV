
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

editCtrl.updateItem=function(){

 		
        var uploadUrl = "/upload";

        if(editCtrl.item.newFile != null){

        	fileUpload.uploadFileToUrl(editCtrl.item.newFile, uploadUrl);
    		editCtrl.item.itempicture = 'images/' + editCtrl.item.newFile.name;
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