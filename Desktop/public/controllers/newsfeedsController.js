angular.module('formApp')
.controller('newsfeedsController',['$scope','$timeout','$http','restApi','shareData', function($scope, $timeout,$http,restApi,shareData) {
  
var newsfeedCtrl = this;
newsfeedCtrl.items = getItems;
newsfeedCtrl.status = {};
shareData.itemSelected = {};
newsfeedCtrl.setValue = setValue;
newsfeedCtrl.page = 0;

newsfeedCtrl.isDisabled= true;

  

  function getItems() {
        restApi.getItems()
            .success(function (data) {
              
                newsfeedCtrl.items = data.items;
              })
            .error(function (error) {
                newsfeedCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    };
  
  
  function setValue(e) {

    shareData.selectedItem= e;

  };

  function refresh(){
      
    };

newsfeedCtrl.thumbsdownfunction = function(id){
  newsfeedCtrl.isDisabled= true;
  restApi.putThumbsdown(id)
            .success(function (data) {
                   newsfeedCtrl.buttonDisabled = false;     
              })
            .error(function (error) {

                newsfeedCtrl.status = 'Unable to load customer data: ' + error.message;
            });


};


newsfeedCtrl.addSeen = function(id){
  
  restApi.addSeen(id)
  .success(function (data){

  })
  .error(function (error){
    newsfeedCtrl.status='Unable to load customer data: ' +error.message;
  });

};


newsfeedCtrl.get10Items = function(offset){
newsfeedCtrl.page= newsfeedCtrl.page+offset;
restApi.get10Items(newsfeedCtrl.page)
.success(function (data){
newsfeedCtrl.items = data.items;
})
.error(function (error){
newsfeedCtrl.status='Unable to load customer data: ' +error.message;
});

};

newsfeedCtrl.get10Items(newsfeedCtrl.page); 

}]);