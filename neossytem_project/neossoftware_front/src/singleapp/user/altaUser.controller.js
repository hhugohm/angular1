(function () {
    'use strict';
    angular.module('neosApplication').controller('AltaUserController',
        function ($scope, userApi) {

            console.log('controller');
            $scope.error = {};
            $scope.statusList = [
                { statusDescription: 'Activo',  id: 1 }, 
                { statusDescription: 'Inactivo',id: 0}
            ];

            $scope.addItem = function (rc) {
                userApi.createUser($scope.dataUser)
                    .success(function (data) {
                        console.log(data);
                        cleanUserForm(rc);
                        $scope.altasuccess = true;
                    })
                    .error(function (data) {
                        console.log(data);
                        $scope.error = data.error.message;
                        $scope.altafailure = true;
                    });
            };

            function cleanUserForm(rc) {
                $scope.dataUser = {};
                rc.restartvalidation();
            }


        });

})();