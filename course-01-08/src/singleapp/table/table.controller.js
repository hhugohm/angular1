(function(){
'use strict';
 angular.module('diveLog').controller('TableController', TableController);
        function TableController($scope,divelogApi) {

            loadDives();

        function loadDives(){

   $scope.loading =true;
   divelogApi.getDives()
      .success(function(data){
        console.log(data);
        $scope.dives=data;
        $scope.loading = false;
      })
      .error(function(data){
            $scope.loading = false;
        console.log(data);
      });
 }


        }
})();