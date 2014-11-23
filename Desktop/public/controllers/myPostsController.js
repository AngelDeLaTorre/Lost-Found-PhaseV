
angular.module('formApp')
.controller('myPostsController',['$scope','$http','$stateParams','restApi','shareData','$state' , function($scope,$http,$stateParams,restApi,shareData,$state) {

var myPostsCtrl = this;

myPostsCtrl.status ={};
myPostsCtrl.credentials = {'myemail':shareData.credentials.myemail,
                            'mykey':shareData.credentials.mykey};


myposts();

function  myposts(){

//alert(myPostsCtrl.credentials.myemail);
  restApi.getMyPosts( myPostsCtrl.credentials)
            .success(function (data) {
              myPostsCtrl.myItems = data.myPosts; 
              if(myPostsCtrl.myItems.length == 0)
              {
                  alert("No items for this email and password.");
                   $state.transitionTo('form.newsfeeds');

              }
           
                            
              })
            .error(function (error) {
                myPostsCtrl.status = 'Unable to load customer data: ' + error.message;
            });

            
        };




    }]);