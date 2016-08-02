(function() {
    "use strict";

    angular.module("content-editable", []);

    var KEYS_CONSTANT = {
        ENTER: 13,
        DELETE: 46,
        BACKSPACE: 8,
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
    };
    angular.module("content-editable").constant("KEYS", KEYS_CONSTANT);

    angular.module("content-editable").directive("contenteditable", contentEditable);
    contentEditable.$inject = ['$compile', 'KEYS'];

    function contentEditable($compile, KEYS) {

        return {
            restrict: "A",
            require: ["ngModel"],
            link: directiveDefinition
        };

        function directiveDefinition(scope, element, attrs, controllers) {
            runConfiguration(element, controllers, scope, attrs);
        }

        function runConfiguration(element, controllers, scope, attrs) {
            var configuration = scope.$eval(attrs.handler);
            if (!configuration) {
                console.error("content editable configuration not provided");
            }


            configContenEditableArea(element, controllers, scope);
            bindContentEditableToAngular(element, controllers, scope);
            bindKeys(element);
            disableAvoidedElements(element, configuration);
        }

        function bindContentEditableToAngular(element, controllers, scope) {
            var ngModelController = controllers[0];

            ngModelController.$render = function() {
                element.html(ngModelController.$viewValue || "");
                $compile(element.contents())(scope);
            };
            // Listen for change events to enable binding
            element.bind('blur keyup change', function() {
                scope.$apply(read);
            });

            function read() {
                //TODO: traduzir elementos html para puro texto
                ngModelController.$setViewValue(element.html());
            }

        }

        function configContenEditableArea(element) {
            angular.element(element).attr("spellcheck", "false");
        }

        function bindKeys(element) {
            element.bind("keypress", function(event) {
                var keyCode = event.keyCode || event.which;
                if (keyCode === KEYS.ENTER) {
                    //event.preventDefault();
                }
            });

            element.bind("click", function(){
                console.log($(element).caret());
            });
        }


        function disableAvoidedElements(element, configuration) {
            element.bind("keypress", function(event) {
                if (configuration.avoid.indexOf(event.key) != -1) {
                    event.preventDefault();
                }
            });

            element.bind("paste", function(event) {
                var clipboardData, pastedData;
                clipboardData = event.clipboardData || window.clipboardData;
                pastedData = clipboardData.getData("Text");

                for (var i = 0; i < configuration.avoid.length; i++) {
                    if (pastedData.indexOf(configuration.avoid[i]) != -1) {
                        event.stopPropagation();
                        event.preventDefault();
                        break;
                    }
                }
            });
        }

    }

}());
