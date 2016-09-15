(function(){
'use strict';
 angular.module('neosApplication').controller('neosUserController', NeosUserController);
function NeosUserController($scope,userApi,$timeout) {
  $scope.users = [];
  $scope.modUser ={};
  $scope.showFormUser = false;
  $scope.howModFormUser = false;
  getUsersData();

$scope.agregarUser = function() {
         $scope.showFormUser = true;
        $scope.showInfoUser = false;
    }

$scope.showOnlyUsers = function() {
        $scope.showFormUser = true;
        $scope.showInfoUser = false;
    }
 function showUsers(){
    $scope.showInfoUser = true;
    $scope.showFormUser = false;
    $scope.howModFormUser = false;
 }



  function getUsersData() {
     
       $scope.loading =true;
        userApi.getAllUser()
              .success(function(data){
                    console.log(data);
                    $scope.users=data;
                    $scope.loading = false;
                    showUsers();
            })
             .error(function(data){
                    console.log(data);
      });
       
/*
       $timeout( userApi.getUser()
              .success(function(data){
                    console.log(data);
        
                    $scope.users=data;
                     
                    $scope.loading = false;
            })
             .error(function(data){
                    console.log(data);
      }), 30000);*/
      /* var timeoutPromise='';

        if (timeoutPromise) {
            $timeout.cancel(timeoutPromise);
        }

       
        timeoutPromise = $timeout(userApi.getUser()
              .success(function(data){
                    console.log(data);
        
                    $scope.users=data;
                    $scope.loading = false;
            })
             .error(function(data){
                    console.log(data);
      }),200000).finally(function(){
                    timeoutPromise = null; //nullify it
            });*/



       /*
       userApi.getUser()
              .success(function(data){
                    console.log(data);
        
                    $scope.users=data;
                    $scope.loading = false;
            })
             .error(function(data){
                    console.log(data);
      });*/
  };


$scope.addItem=function(){
   // alert('SE VAN A GURDAR LOS ELEMENTOS');
    userApi.createUser($scope.dataUser)
           .success(function(data){
                console.log(data);
                cleanUserForm();
                getUsersData();
                showUsers();
      })
            .error(function(data){
                console.log(data);
      });
};
$scope.updateItem=function(){
    userApi.updateUser($scope.modUser)
           .success(function(data){
                console.log(data);
                $scope.showModFormUser = false;
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
                    showUsers();
            })
             .error(function(data){
                    console.log(data);
      });
  };

  $scope.showModUser =function (idUser) {
       userApi.getUser(idUser)
              .success(function(data){
                    console.log(data);
                     $scope.modUser=data;
                     $scope.showInfoUser = false;
                     $scope.showModFormUser = true;
                     console.log($scope.modUser.name);
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