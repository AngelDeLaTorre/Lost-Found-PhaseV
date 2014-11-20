(function () {
 'use strict';

 var serviceId = 'restApi';

   // TODO: replace app with your module name
   angular.module('formApp').factory(serviceId, ['$http', addrestApi]);

   function addrestApi($http) {
    var service = {
        getUsers:getUsers,
        getItems:getItems,
        getItemId:getItemId,
        getItemsAdmin:getItemsAdmin,
        getLostItems:getLostItems,
        getFoundItems:getFoundItems,
        getComments:getComments,
        getAdminComments:getAdminComments,
        getUserAdmin:getUserAdmin,        
        postUser:postUser,
        postComment:postComment,
        postFeedback:postFeedback,
        postItem:postItem,
        putThumbsdown:putThumbsdown,
        getMyPosts:getMyPosts,
        blockAdminUser:blockAdminUser,
        unblockAdminUser:unblockAdminUser,
        blockAdminItem:blockAdminItem,
        unblockAdminItem:unblockAdminItem,
        getItemSearchAdmin:getItemSearchAdmin,
        getAdmins:getAdmins,
        removeAdmin:removeAdmin,
        postItemPic:postItemPic,
        getAuth:getAuth,
        updateUser:updateUser,
        updateItem:updateItem,
        resetKey:resetKey,
        getLostItemsSearch:getLostItemsSearch,
        getFoundItemsSearch:getFoundItemsSearch,
        blockAdminComment:blockAdminComment,
        unblockAdminComment:unblockAdminComment,
        addSeen:addSeen,
        uploadPic:uploadPic,

         getUserEmail:getUserEmail,

        get10Items:get10Items,
        get10LostItems:get10LostItems,
        get10FoundItems:get10FoundItems


     



    };


    return service;

    function postItemPic(image){
    return $http.post('/upload',image,{
                        headers: { 'Content-Type': false },
                        transformRequest: angular.identity
                    });
  };


   function uploadPic(fileContent, name){       
    return $http.post('/base64/'+ name,{
    base64: fileContent
});
 }
   
    function getUserEmail (email){
            return $http.get('/getUserEmail/' + email);
       }   
    function getUsers(){

    return $http.get('/allUsers');
  };


  function getAdmins(){
    return $http.get('/allAdmins');
  };

  function getItems(){
    return $http.get('/allItems');
  };

  function getItemsAdmin(){
    return $http.get('/allItemsAdmin');
  };

  // function getCategories(){
  //   return $http.get('/allCategories');
  // };

  // function postCategories(newCategory){
  //   var data = {type:newCategory};
  //   return $http.post('/aCategories/', data);
  // };
  function getItemId(id){
    return $http.get('/itemId/' + id );
  };

  function getLostItems(){
    return $http.get('/allLostItems');
  };

  function getFoundItems(){
    return $http.get('/allFoundItems');
  };

  function getComments(id){
    return $http.get('/allComments/'+id);
  };
  function postUser(newUser){
    var data= newUser;
    return $http.post('/newUser/',data);
  };

  function postComment(comment){
    var data= comment;
    return $http.post('/addComment/',data);
  };
  function postFeedback(feedback){
    var data= feedback;
    return $http.post('/addFeedback/',data);
  };

  function getUserAdmin(id){
    return $http.get('/anUser/'+id);
  };


  function getItemSearchAdmin(id){
    return $http.get('/anItem/'+id);
  };

  // function deleteCategory(id){
  //   return $http.delete('/deleteCategory/'+id);
  // };

  function postItem(newItem){
     var data = newItem;
     console.log(newItem);
    return $http.post('/postItem/', data);
  };
  function getAuth(credentials){
     var data = credentials;
    return $http.get('/getAuth/'+ data.email);
  };

  function putThumbsdown(id){
    var data = {id:id};
    return $http.post('/putThumbsdown/',data);
  };

  function getMyPosts(cred){
   
    return $http.get('/myPostsItems/'+cred.myemail+'/'+cred.mykey);
  };

  function blockAdminUser(id){
    var data = {id:id};
    return $http.post('/blockAdminUser/',data);
  };


  function unblockAdminUser(id){
    var data = {id:id};
    return $http.post('/unblockAdminUser/',data);
  };

  function updateUser(user){
    var data = user;
    return $http.post('/updateUser/',data);
  };

  function updateItem(item){
    var data = item;
    return $http.post('/updateItem/',data);
  };

  function blockAdminItem(id){
    var data = {id:id};
    return $http.post('/blockAdminItem/',data);
  };

  function unblockAdminItem(id){
    var data = {id:id};
    return $http.post('/unblockAdminItem/',data);
  };

  function removeAdmin(id){
    var data = {id:id};
    return $http.post('/removeAdmin/',data);
  };

   function resetKey(id){
    var data = {id:id};
    return $http.post('/resetKey/',data);
  };

  function getLostItemsSearch(id){
    return $http.get('/anLostItem/'+id);
  };

  function getFoundItemsSearch(id){
    return $http.get('/anFoundItem/'+id);
  };

  function getAdminComments(id){
    return $http.get('/allAdminComments/'+id);
  };

  function blockAdminComment(id){
    var data = {id:id};
    return $http.post('/blockAdminComment/',data);
  };

  function unblockAdminComment(id){
    var data = {id:id};
    return $http.post('/unblockAdminComment/',data);
  };

  function addSeen(id){
    var data = {id:id};
    return $http.post('/addSeen/',data);
  };

  function get10Items(offset){
    return $http.get('/get10Items/'+offset);
  };

  function get10LostItems(offset){
    return $http.get('/get10LostItems/'+offset);
  };

  function get10FoundItems(offset){
    return $http.get('/get10FoundItems/'+offset);
  };

}


}

)();

