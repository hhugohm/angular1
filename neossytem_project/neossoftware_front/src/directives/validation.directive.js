(function() {
    var showErrorsModule;
    showErrorsModule = angular.module('ui.bootstrap.validation', []);

    showErrorsModule.directive('serverErrors', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="alert alert-danger" style="display:none"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>Ocurrieron los siguientes errores: <ul></ul></div>',
            scope: {
                // creates a scope variable in your directive
                // called `locations` bound to whatever was passed
                // in via the `locations` attribute in the DOM
                errors: '=errors'
            },
            link: function(scope, element, attrs) {
                scope.$watch('errors', function(errors) {
                    //delete content
                    var ul = element.find('ul');
                    ul.remove();


                    if (errors != null) {
                        element.append('<ul>');
                        var ulElement = element.find('ul');

                        angular.forEach(errors, function(error, key) {
                            var errorDesc = '';
                            if (error.code != null) {
                                errorDesc = error.code + ' ' + error.description;
                            } else {
                                errorDesc = error.description;
                            }

                            ulElement.append('<li>' + errorDesc + '</li>');

                        });
                        element.append('</ul>');

                        element.css('display', "block");
                    } else {
                        element.css('display', "none");
                    }
                });
            }
        };
    });

    showErrorsModule.directive(
        'rcSubmit', ['$parse', function($parse) {
            return {
                restrict: 'A',
                require: ['rcSubmit', '?form'],
                controller: ['$scope', function($scope) {
                    this.attempted = false;

                    var formController = null;

                    this.setAttempted = function() {
                        this.attempted = true;
                    };

                    this.setFormController = function(controller) {
                        formController = controller;
                    };

                    this.restartvalidation = function() {
                        this.attempted = false;
                        formController.$setPristine();
                        formController.$setUntouched();


                        var formName = formController.$name;



                        var errornamediv = "errCte" + "-" + formName;

                        var idErrDiv = errornamediv;

                        if (document.getElementById(errornamediv) != null) {


                            document.getElementById(idErrDiv).style.display = "none";


                        }



                    }

                    this.needsAttention = function(fieldModelController) {
                        if (!formController) return false;

                        if (fieldModelController) {
                            return fieldModelController.$invalid && (fieldModelController.$dirty || this.attempted);
                        } else {
                            return formController && formController.$invalid && (formController.$dirty || this.attempted);
                        }
                    };
                }],
                compile: function(cElement, cAttributes, transclude) {
                    return {
                        pre: function(scope, formElement, attributes, controllers) {

                            var submitController = controllers[0];
                            var formController = (controllers.length > 1) ? controllers[1] : null;

                            submitController.setFormController(formController);

                            scope.rc = scope.rc || {};
                            scope.rc[attributes.name] = submitController;
                        },
                        post: function(scope, formElement, attributes, controllers) {

                            var submitController = controllers[0];
                            var formController = (controllers.length > 1) ? controllers[1] : null;
                            var fn = $parse(attributes.rcSubmit);
                        var formName = formController.$name;
                            scope.$watch(formName + '.$valid', function() {
                              var errornamediv = "errCte" + "-" + formName;

                              var idErrDiv = errornamediv;

                              if (document.getElementById(errornamediv) != null) {


                                  document.getElementById(idErrDiv).style.display = "none";


                              }
                            });




                            formElement.bind('submit', function(event) {


                                var form_name = formController.$name;
                                var errornamediv = "errCte" + "-" + form_name;
                                var formselector = "#" + form_name;
                                var idErrDiv = errornamediv;
                                form = angular.element(document.querySelector(formselector));


                                submitController.setAttempted();
                                if (!scope.$$phase) scope.$apply();

                                if (!formController.$valid) {


                                    if (document.getElementById(errornamediv) == null) {
                                        form.prepend("<div class='form-group' id='" + errornamediv + "'  name='errCte'>  " +
                                            "<div class='col-sm-9'> " +
                                            "<div class='alert alert-danger' role='alert'>" +
                                            "<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span> <span class='sr-only'>Error:</span> Ocurrieron errores de validación" +
                                            "</div>" +
                                            "</div> " +
                                            "</div>");
                                    } else {
                                        //validate if
                                        if (document.getElementById(idErrDiv).style.display == 'none') {
                                            document.getElementById(idErrDiv).style.display = "block";
                                        }

                                    }


                                    return false;

                                } else {

                                    if (document.getElementById(errornamediv) != null) {
                                        //validate if
                                        if (document.getElementById(idErrDiv).offsetLeft > 0) {
                                            document.getElementById(idErrDiv).style.display = "none";
                                        }
                                        //hide all errcte in the page


                                    }
                                }

                                scope.$apply(function() {
                                    fn(scope, {
                                        $event: event
                                    });
                                });
                            });
                        }
                    };
                }
            };
        }]
    );


    //directiva que coloca el mensaje de error en las validaciones del cliente
    //@neossoftware 2016

    showErrorsModule.directive('angularForm', ['$injector', '$parse',
        function($injector, $parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs, fn) {

                    // This is the DOM form element
                    var DOMForm = angular.element(element)[0];


                    // This is the the scope form model
                    // All validation states are contained here
                    var form_name = DOMForm.attributes['name'].value;
                    var scopeForm = $parse(form_name)(scope);

                    var formselector = "#" + form_name;
                    var errornamediv = "errCte" + "-" + form_name;
                    var diverrselector = "#" + errornamediv;
                    var idErrDiv = errornamediv;
                    //activa un div de errores
                    form = angular.element(document.querySelector(formselector));

                    scopeForm.submitted = false;


                    // Intercept and handle submit events of the form
                    element.on('submit', function(event) {

                        scope.$broadcast('show-errors-check-validity');
                        event.preventDefault();
                        scope.$apply(function() {
                            scopeForm.submitted = true;
                        });


                        if (scopeForm.$valid) {
                            scope.$apply(function() {
                                scope.$eval(DOMForm.attributes["angular-form"].value);
                            });
                        } else {

                            if (document.getElementById(errornamediv) == null) {
                                form.prepend("<div class='form-group' id='" + errornamediv + "'> " +
                                    "<div class='col-sm-9'> " +
                                    "<div class='alert alert-danger' role='alert'>" +
                                    "<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span> <span class='sr-only'>Error:</span> Ocurrieron errores de validación" +
                                    "</div>" +
                                    "</div> " +
                                    "</div>");
                            } else {
                                //validate if
                                if (document.getElementById(idErrDiv).offsetLeft < 0) {
                                    document.getElementById(idErrDiv).style.display = "block";
                                }

                            }


                        }

                    });

                    scope.$watch(form_name + '.$valid', function() {
                        if (scopeForm.$valid && scopeForm.submitted) {
                            document.getElementById(idErrDiv).style.display = "none";
                        } else if (scopeForm.$invalid && scopeForm.submitted) {
                            document.getElementById(idErrDiv).style.display = "block";
                        }
                    });




                }
            };
        }
    ]);
    //http://blog.yodersolutions.com/bootstrap-form-validation-done-right-in-angularjs/?utm_source=github&utm_medium=readme&utm_campaign=code

    //https://github.com/turinggroup/angular-validator
    showErrorsModule.directive('showErrors', [
        '$timeout', 'showErrorsConfig', '$interpolate',
        function($timeout, showErrorsConfig, $interpolate) {
            var getShowSuccess, getTrigger, linkFn;
            getTrigger = function(options) {
                var trigger;
                trigger = showErrorsConfig.trigger;
                if (options && (options.trigger != null)) {
                    trigger = options.trigger;
                }
                return trigger;
            };

            hasfeedBack = function(options, el, inputEl) {

                if (options && (options.hasfeedback != null)) {
                    if (options.hasfeedback) {
                        el.addClass('has-feedback');
                        angular.element(inputEl).after("<span class='glyphicon glyphicon-remove form-control-feedback'></span>");
                    }
                }

                return hasfeedBack;
            };

            getShowSuccess = function(options) {
                var showSuccess;
                showSuccess = showErrorsConfig.showSuccess;
                if (options && (options.showSuccess != null)) {
                    showSuccess = options.showSuccess;
                }
                return showSuccess;
            };
            linkFn = function(scope, el, attrs, formCtrl) {
                var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses, trigger;
                blurred = false;
                options = scope.$eval(attrs.showErrors);
                showSuccess = getShowSuccess(options);
                trigger = getTrigger(options);
                inputEl = el[0].querySelector('.form-control[name]');
                hasfeedBack(options, el, inputEl);
                inputNgEl = angular.element(inputEl);
                inputName = $interpolate(inputNgEl.attr('name') || '')(scope);
                if (!inputName) {
                    throw "show-errors element has no child input elements with a 'name' attribute and a 'form-control' class";
                }
                inputNgEl.bind(trigger, function() {
                    blurred = true;
                    return toggleClasses(formCtrl[inputName].$invalid);
                });

                scope.$watch(function() {
                    return formCtrl[inputName] && formCtrl[inputName].$invalid;
                }, function(invalid) {
                    if (!blurred) {
                        return;
                    }
                    return toggleClasses(invalid);
                });




                scope.$on('show-errors-check-validity', function() {
                    return toggleClasses(formCtrl[inputName].$invalid);
                });
                scope.$on('show-errors-reset', function() {
                    return $timeout(function() {
                        el.removeClass('has-error');
                        el.removeClass('has-success');
                        return blurred = false;
                    }, 0, false);
                });
                return toggleClasses = function(invalid) {
                    el.toggleClass('has-error', invalid);



                    if (showSuccess) {
                        return el.toggleClass('has-success', !invalid);
                    }
                };
            };
            return {
                restrict: 'A',
                require: '^form',
                compile: function(elem, attrs) {
                    if (attrs['showErrors'].indexOf('skipFormGroupCheck') === -1) {
                        if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
                            throw "show-errors element does not have the 'form-group' or 'input-group' class";
                        }
                    }
                    return linkFn;
                }
            };
        }
    ]);

    showErrorsModule.provider('showErrorsConfig', function() {
        var _showSuccess, _trigger;
        _showSuccess = false;
        _trigger = 'blur';
        this.showSuccess = function(showSuccess) {
            return _showSuccess = showSuccess;
        };
        this.trigger = function(trigger) {
            return _trigger = trigger;
        };
        this.$get = function() {
            return {
                showSuccess: _showSuccess,
                trigger: _trigger
            };
        };
    });

}).call(this);
