 (function(){
'use strict';


angular.module('diveLog').config(function($stateProvider, $urlRouterProvider){

      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/table")

      $stateProvider
        .state('table', {
            url: "/table",
            templateUrl: "/singleapp/table/table.html",
            controller: 'TableController'
        })
        .state('alta', {
            url: "/alta",
            templateUrl: "/singleapp/alta/formAlta.html",
            controller:'AltaController'
        })
    });

})();


