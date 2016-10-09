(function () {
    'use strict';
    angular.module('neosApplication').controller('NeosUserController', NeosUserController);
    function NeosUserController($scope, userApi, $timeout,$location) {
        $scope.gridOptions = {
            enableSorting: true,
            enableCellEditOnFocus: true,
            enableFiltering: true,
            columnDefs: [
                {
                    field: 'iduser', width: '10%', displayName: 'ID', enableFiltering: false, cellTemplate: '<button type="button" class="btn btn-link"  ng-click="grid.appScope.showModUser(row.entity.iduser)">{{grid.getCellValue(row, col)}}</button>'
                },
                {
                    field: 'name', displayName: 'Nombre', enableFiltering: true
                }, {
                    field: 'lastname', displayName: 'LO MOVI', enableFiltering: false
                }, {
                    field: 'email', displayName: 'Email', enableFiltering: false
                }, {
                    field: 'password', displayName: 'Password', enableFiltering: false
                }, {
                    field: 'createDate', displayName: 'Fecha creacion', enableFiltering: false
                }, {
                    field: 'updateDate', displayName: 'Fecha Mod', enableFiltering: false
                }, {
                    field: 'status', displayName: 'Estatus', enableFiltering: false
                }, {
                    field: 'iduser', displayName: 'Borrar', enableFiltering: false, enableSorting: false, enableCellEdit: false, cellTemplate: '<button type="button" class="btn btn-link"  ng-click="grid.appScope.deleUser(row.entity.iduser)" >Delete</button>'
                }
            ]
        }

        $scope.users = [];
        $scope.modUser = {};
        $scope.showFormUser = false;
        $scope.showModFormUser = false;
        getUsersData();

        $scope.agregarUser = function () {
            $scope.showFormUser = true;
            $scope.showInfoUser = false;
        }

        $scope.showOnlyUsers = function (rc) {
            cleanUserForm(rc);
            $scope.showFormUser = false;
            $scope.showInfoUser = true;
        }
        function showUsers() {
            $scope.showInfoUser = true;
            $scope.showFormUser = false;
            $scope.showModFormUser = false;
        }



        function getUsersData() {

            $scope.loading = true;
            userApi.getAllUser()
                .success(function (data) {
                    console.log(data);
                    $scope.users = data;
                    $scope.gridOptions.data = data;
                    $scope.loading = false;
                    showUsers();
                })
                .error(function (data) {
                    $scope.loading = false;
                    console.log(data);
                });
        };


       
        $scope.updateItem = function () {
            userApi.updateUser($scope.modUser)
                .success(function (data) {
                    console.log(data);
                    $scope.showModFormUser = false;
                    getUsersData();
                })
                .error(function (data) {
                    cleanUserForm(rc);
                    console.log(data);
                });
        };

        $scope.deleUser = function (idUser) {
            console.log("USER BORRAR: " + idUser);
            userApi.deleUser(idUser)
                .success(function (data) {
                    console.log(data);
                    getUsersData();
                    showUsers();
                })
                .error(function (data) {
                    console.log(data);
                });
        };

        $scope.showModUser = function (idUser) {
            console.log("USER MOD: " + idUser);
             console.log($location.path);
             $location.path( '/modifica/' +idUser );
            
        };


        function cleanUserForm(rc) {
            $scope.dataUser = {};
            rc.restartvalidation();
        }
    };

})();
