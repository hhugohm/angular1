/**
 * Directive Loading effect
 * @neossoftware
 * */
(function() {
    'use strict';


    angular.module('common.directives', [])
        .directive('loading', function() {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="ajaxloading" />',
                link: function(scope, element, attr) {
                    scope.$watch('loading', function(val) {
                        if (val)
                            scope.cssClass = "loading";
                        else
                            scope.cssClass = "";
                    });
                }
            };
        })

    .directive('ngPrint', function($window) {
        return {

            restrict: 'E',
            //transclude: true,
            scope: {
                params: '=print'
            },
            template: '<button class="btn btn-default  pull-right" type="button"><i class="fa fa-print"></i> Print</button>',
            link: function(scope, element, attrs) {


                element.on('click', function() {
                    if (scope.params != null) {

                        angular.forEach(scope.params.enableprint, function(value, key) {
                            var divSelector = "#" + value;
                            var div = angular.element(document.querySelector(divSelector));
                            // div.removeClass('hidden');
                            div.removeClass('hidden-print');
                            div.addClass('visible-print-block');
                        });

                        //disable print
                        angular.forEach(scope.params.hideprint, function(value, key) {
                            var divSelector = "#" + value;
                            var div = angular.element(document.querySelector(divSelector));

                            div.removeClass('visible-print-block');
                            div.addClass('hidden-print');
                        });

                        angular.forEach(scope.params.removehiddenprint, function(value, key) {
                            var divSelector = "#" + value;
                            var div = angular.element(document.querySelector(divSelector));
                            // div.removeClass('hidden');
                            div.removeClass('hidden-print');
                        });


                    }


                    $window.print();
                });



            }
        };
    })

.directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseInt(viewValue, 10);
            });
        }
    };
})


    .directive('capitalize', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var capitalize = function(inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                };
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    });


})();
