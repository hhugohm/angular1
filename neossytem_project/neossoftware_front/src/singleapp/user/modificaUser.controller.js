(function () {
    'use strict';
    angular.module('neosApplication').controller('ModificaUserController', 
      function($scope, userApi,$stateParams) {

      console.log('modifica');

 console.log($stateParams);
 showModUser($stateParams.ID);


        function showModUser(idUser) {
            console.log("USER MOD: " + idUser);
            userApi.getUser(idUser)
                .success(function (data) {
                    console.log(data);
                    $scope.modUser = data;
                   
                    console.log($scope.modUser.name);
                })
                .error(function (data) {
                    console.log(data);
                });
        }


    });

})();