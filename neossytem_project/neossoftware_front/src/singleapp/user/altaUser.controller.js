(function () {
    'use strict';
    angular.module('neosApplication').controller('AltaUserController', 
      function($scope, userApi) {

      console.log('controller');
      $scope.error={};

       $scope.addItem = function (rc) {
 //$scope.dataUser.statusId  = $scope.dataUser.status.id;
            // alert('SE VAN A GURDAR LOS ELEMENTOS');
            userApi.createUser($scope.dataUser)
                .success(function (data) {
                    console.log(data);
                    cleanUserForm(rc);
                    $scope.altasuccess = true;
                    //getUsersData();
                    //showUsers();
                })
                .error(function (data) {
                    console.log(data);
                    $scope.error=data.error.message;
                    $scope.altafailure=true;
                });
        };


        function cleanUserForm(rc) {
            $scope.dataUser = {};
            rc.restartvalidation();
        }




    });

})();