
angular.module('formApp')
.controller('editItemController',['$scope','$http','$stateParams','restApi','fileUpload','$timeout','$state', function($scope,$http,$stateParams,restApi,fileUpload,$timeout,$state) {

var editCtrl = this;
 editCtrl.progress = 0;
    prog =0;
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

            editCtrl.progressfunction();
};
   
editCtrl.updateUser=function(){
	restApi.updateUser(editCtrl.item)

			.success(function () {
                            
            })
            .error(function (error) {
                editCtrl.status = 'Unable to load customer data: ' + error.message;
            });
}

editCtrl.progressfunction = function(){
        

        if(prog ===100)
            return $state.go('form.newsfeeds') ;

              prog++;
            editCtrl.progress = prog;
           
            $timeout(editCtrl.progressfunction,100);

        

    };





 }]);