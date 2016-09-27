 (function(){
'use strict';


angular.module('neosApplication').config(function($stateProvider, $urlRouterProvider){

      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/user")

      $stateProvider
        .state('user', {
            url: "/user",
            templateUrl: "/singleapp/user/showUser.html",
            controller: 'NeosUserController'
        })
        .state('modifica', {
            url: "/modifica",
            templateUrl: "/singleapp/user/updateUser.html",
            controller: 'NeosUserController'
        })
        .state('alta', {
            url: "/alta",
            templateUrl: "/singleapp/user/altaUser.html",
            controller: 'NeosUserController'
        })
    });

})();