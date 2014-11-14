angular.module('formApp')
.controller('adminItemsController',['$scope','$http','restApi', 'shareData','$timeout' , function($scope,$http,restApi,shareData,$timeout) {


var itemCtrl = this;
itemCtrl.items = {};
shareData.commentofitem = {};
itemCtrl.setValue = setValue;
itemCtrl.setValueForSearch =setValueForSearch;
itemCtrl.status = {};
itemCtrl.searchBar ={}

  getItemsAdmin();  
  function getItemsAdmin() {
        restApi.getItemsAdmin()
            .success(function (data) {
              
                itemCtrl.items = data.items;
              })
            .error(function (error) {
                itemCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }

  
  function setValue(e) {
    shareData.commentofitem = e;
  };

  function setValueForSearch(e){
    
    itemCtrl.searchBar = e;
    getItemSearchAdmin();
 
  }

  function getItemSearchAdmin(){
    
    restApi.getItemSearchAdmin(itemCtrl.searchBar)
            .success(function (data) {
              
                itemCtrl.items = data.items;
              })
            .error(function (error) {
                itemCtrl.status = 'Unable to load customer data: ' + error.message;
            });

};



  itemCtrl.getSelectedForBlock= function(){
  angular.forEach(itemCtrl.items, function (item) {
            if(item.Selected){
              
              restApi.blockAdminItem(item.itemid)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                itemCtrl.status = 'Unable to load customer data: ' + error.message;
            });

            }
        });
$timeout(getItemsAdmin, 1000);
};

itemCtrl.getSelectedForUNBlock= function(){
  angular.forEach(itemCtrl.items, function (item) {
            if(item.Selected){
             
        restApi.unblockAdminItem(item.itemid)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                itemCtrl.status = 'Unable to load customer data: ' + error.message;
            });

            }
        });

};




}]);