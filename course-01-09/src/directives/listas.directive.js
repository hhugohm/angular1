(function() {
    'use strict';


    angular.module('lista.directives', [])
        .directive('list', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attr) {
                    console.log('en la directiva');
                    var data = $scope[attr["list"]];
                    if(angular.isArray(data)){
                        var listElem= angular.element("<ul>");
                        element.append(listElem);
                        angular.forEach(data,function(value,key){
                            console.log(value);
                            listElem.append(angular.element('<li>').text(value.name));
                        });
                    }
                }
            };
        });
})();  