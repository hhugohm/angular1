(function(){
'use strict';
 angular.module('diveLog').controller('diveLogCtrl', DiveLogCtrl);
function DiveLogCtrl($scope,divelogApi) {

$scope.service=divelogApi;


loadDives();


 $scope.onlyNumbers=/^\d+$/;

 $scope.showInfo = true;
 $scope.showForm = false;

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

 $scope.evalua= function(){
   return 2==2;
 }

 $scope.agregar = function() {
     //alert('agregar elemento');
     $scope.showForm = true;
     $scope.showInfo = false;
 }
 $scope.addItem=function(){
   console.log($scope.zone);
   $scope.dives.push($scope.zone);
   $scope.showForm = false;
   $scope.showInfo = true;
 }

 /*
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
 }];*/
};


})();
