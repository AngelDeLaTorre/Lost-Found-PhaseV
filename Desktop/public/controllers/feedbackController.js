angular.module('formApp')
.controller('feedbackController', ['$scope','$http','restApi','shareData' , function($scope,$http,restApi,shareData) {
	var feedbackCtrl =this;
	feedbackCtrl.objectMessage={};
	
	feedbackCtrl.getComment = function (object){
    feedbackCtrl.objectMessage=object;   
    postComment();
  };
	// we will store all of our form data in this object
	function postComment() {
        
        restApi.postFeedback(feedbackCtrl.objectMessage)
            .success(function (data) {
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };



	


	
}]);