
angular.module('formApp')
.controller('adminCommentController',['$scope','$http','restApi','shareData' , function($scope,$http,restApi,shareData) {

var commentCtrl = this;
commentCtrl.comments = getAdminComments;
commentCtrl.status = {};
 commentCtrl.getSelected = {};

getAdminComments();
   
function getAdminComments() {
        
        restApi.getAdminComments(shareData.commentofitem)
            .success(function (data) {
                commentCtrl.comments = data.comments;              
                
              })
            .error(function (error) {
                commentCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    };


    commentCtrl.getSelectedForBlock= function(){
    angular.forEach(commentCtrl.comments, function (comment) {
            if(comment.Selected){
              restApi.blockAdminComment(comment.commentid)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                userCtrl.status = 'Unable to load customer data: ' + error.message;
            });
            }
        });

};
    commentCtrl.getSelectedForUNBlock= function(){
      angular.forEach(commentCtrl.comments, function (comment) {
                if(comment.Selected){
                   restApi.unblockAdminComment(comment.commentid)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                userCtrl.status = 'Unable to load customer data: ' + error.message;
            });
                }
            });

};


    }]);