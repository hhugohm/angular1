angular.module('neosApplication', ['ngMessages']).controller('neosUserController',NeosUserController);
function NeosUserController($scope,$http) {
  $scope.users = [];
  $scope.dataUser= {
      name : ''
  };
 _refreshUsersData();

  function _refreshUsersData() {
      $http({
            method : 'GET',
            url : 'http://localhost:8085/api/user'
        }).then(function successCallback(response) {
                        $scope.users = response.data;
        }, function errorCallback(response) {
                        console.log(response.statusText);
            });
  }

$scope.cambiarItem=function(){
$scope.dataUser.name="MI VALOR2";

}

  $scope.addItem=function(){
    alert('SE VAN A GURDAR LOS ELEMENTOS');
    $http({
                    method : 'POST',
                    url : 'http://localhost:8085/api/user',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data:  $.param($scope.dataUser)
                    //data: {name: $scope.formUser.name, lastName: $scope.formUser.lastName,email:$scope.formUser.email,password:$scope.formUser.password}
                }).then( _success, _error );
            };
//  }	headers: {'Content-Type': 'application/x-www-form-urlencoded'},

  function _success(response) {
    $scope.formUser.name ='';
    $scope.formUser.lastName ='';
    $scope.formUser.email ='';
    $scope.formUser.password ='';
     _refreshUsersData();
              //  _clearFormData()
            }

            function _error(response) {
                console.log(response);
            }

    $scope.dives = [{
        site: 'Abu Gotta Ramada',
        location: 'Hurghada, Egypt',
        depth: 72,
        time: 54
    }, {
        site: 'Ponte Mahoon',
        location: 'Maehbourg, Mauritius',
        depth: 54,
        time: 38
    }, {
        site: 'Molnar Cave',
        location: 'Budapest, Hungary',
        depth: 98,
        time: 62
    }];
}
