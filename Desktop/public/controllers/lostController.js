angular.module('formApp')
.controller('lostController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData) {

var lostCtrl = this;
lostCtrl.lostItems = getLostItems;
lostCtrl.status = {};
shareData.itemStatus = {};
lostCtrl.searchLostItem ={};
lostCtrl.page = 0;

  //getLostItems();  
  function getLostItems() {
        restApi.getLostItems()
            .success(function (data) {
              
                lostCtrl.lostItems = data.lostItems;
              })
            .error(function (error) {
                lostCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    };
     
    lostCtrl.setItems = function(e){
    lostCtrl.searchLostItem = e;
    getLostItemsSearch();
 
  };

  function  getLostItemsSearch() {
        restApi.getLostItemsSearch(lostCtrl.searchLostItem)
            .success(function (data) {
              
                lostCtrl.lostItems = data.items;
              })
            .error(function (error) {
                lostCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    };

    lostCtrl.setValue = function(stat){
      shareData.itemStatus= stat;
     
    };


    lostCtrl.thumbsdownfunction = function(id){
  
  restApi.putThumbsdown(id)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                lostCtrl.status = 'Unable to load customer data: ' + error.message;
            });

};

lostCtrl.addSeen = function(id){
  
  restApi.addSeen(id)
  .success(function (data){

  })
  .error(function (error){
    lostCtrl.status='Unable to load customer data: ' +error.message;
  });

};

lostCtrl.get10LostItems = function(offset){
lostCtrl.page = lostCtrl.page+offset;
restApi.get10LostItems(lostCtrl.page)
.success(function (data){
lostCtrl.lostItems = data.lostItems;
})
.error(function (error){
lostCtrl.status='Unable to load customer data: ' +error.message;
});

};

lostCtrl.get10LostItems(lostCtrl.page); 
  
}]);