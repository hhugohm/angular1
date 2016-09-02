(function(){
'use strict';
 angular.module('neosApplication').controller('neosUserController', NeosUserController);
function NeosUserController($scope,userApi,$timeout) {
  $scope.users = [];
 
  getUsersData();

  function getUsersData() {
       $scope.loading =true;
       //var promise=20000000;
       userApi.getUser()
              .success(function(data){
                    console.log(data);
                      promise = $timeout(function() {
    //ajax call goes here..
    },2000);
                    $scope.users=data;
                    $scope.loading = false;
            })
             .error(function(data){
                    console.log(data);
      });
  };


$scope.addItem=function(){
   // alert('SE VAN A GURDAR LOS ELEMENTOS');
    userApi.createUser($scope.dataUser)
           .success(function(data){
                console.log(data);
                cleanUserForm();
                getUsersData();
      })
            .error(function(data){
                console.log(data);
      });
};

$scope.deleUser =function (idUser) {
       userApi.deleUser(idUser)
              .success(function(data){
                    console.log(data);
                    getUsersData();
            })
             .error(function(data){
                    console.log(data);
      });
  };


  function cleanUserForm() {
    $scope.dataUser.name ='';
    $scope.dataUser.lastName ='';
    $scope.dataUser.email ='';
    $scope.dataUser.password ='';
    }

    /*
$scope.addItem=function(){
    alert('SE VAN A GURDAR LOS ELEMENTOS');
    $http({
            method : 'POST',
            url : 'http://localhost:8085/api/user',
            headers: {'Content-Type': 'application/json'},
            data:  angular.toJson($scope.dataUser)
        }).then( _success, _error );
};
*/

   
};

})();