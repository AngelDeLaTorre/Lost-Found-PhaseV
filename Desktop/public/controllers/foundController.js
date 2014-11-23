angular.module('formApp')
.controller('foundController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData) {

var foundCtrl = this;
foundCtrl.foundItems = getFoundItems;
foundCtrl.status = {};
shareData.itemStatus = {};
foundCtrl.searchFoundItem ={};
foundCtrl.page = 0;
  

  function getFoundItems() {
        restApi.getFoundItems()
            .success(function (data) {
              
                foundCtrl.foundItems = data.foundItems;
              })
            .error(function (error) {
                foundCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }

    foundCtrl.setItems = function(e){
    foundCtrl.searchFoundItem = e;
    getFoundItemsSearch();
 
  };

  function  getFoundItemsSearch() {
        restApi.getFoundItemsSearch(foundCtrl.searchFoundItem)
            .success(function (data) {
              
                foundCtrl.foundItems = data.items;
         
              })
            .error(function (error) {
                foundCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    };
    
  foundCtrl.setValue = function(stat){
      shareData.itemStatus= stat;
      
    };

     foundCtrl.thumbsdownfunction = function(id){
  
        restApi.putThumbsdown(id)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                foundCtrl.status = 'Unable to load customer data: ' + error.message;
            });

};

foundCtrl.addSeen = function(id){
  
  restApi.addSeen(id)
  .success(function (data){

  })
  .error(function (error){
    newsfeedCtrl.status='Unable to load customer data: ' +error.message;
  });

};

foundCtrl.get10FoundItems = function(offset){
foundCtrl.page = foundCtrl.page+offset;
restApi.get10FoundItems(foundCtrl.page)
.success(function (data){
foundCtrl.foundItems = data.foundItems;
})
.error(function (error){
foundCtrl.status='Unable to load customer data: ' +error.message;
});

};

foundCtrl.get10FoundItems(foundCtrl.page); 


}]);