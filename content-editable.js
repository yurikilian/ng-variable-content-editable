(function() {
    "use strict";

    angular.module("content-editable", []);
    angular.module("content-editable").constant("KEYS", {
        ENTER: 13,
        DELETE: 46,
        BACKSPACE: 8,
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
    });

    angular.module("content-editable").directive("contenteditable", ["$compile", "KEYS", function($compile, KEYS) {

      return {
          restrict: "A",
          require: ["ngModel"],
          link: directiveDefinition
      };

      function directiveDefinition(scope, element, attrs, controllers) {
            var ngModelController = controllers[0];
            runConfiguration(element, scope.$eval(attrs.handler));

            element.bind("blur keyup change", function() {
                scope.$apply(function() {
                    ngModelController.$setViewValue(element.html());
                });
            });

            ngModelController.$render = function() {
                element.html(ngModelController.$viewValue || "");
                $compile(element.contents())(scope);
            };
        }

        function runConfiguration(element, configuration) {
            if (!configuration) {
                console.error("content editable configuration not provided");
            }

            configContenEditableArea(element);
            bindKeys(element);
            disableAvoidedElements(element, configuration);
        }

        function configContenEditableArea(element) {
          angular.element(element).attr("spellcheck","false");
        }

        function bindKeys(element) {
            element.on("keypress", function(event) {
                var keyCode = event.keyCode || event.which;
                if (keyCode == KEYS.ENTER) {
                    event.preventDefault();
                }

            });

            element.on("keydown", function(event) {
                var keyCode = event.keyCode || event.which;
                if (keyCode == KEYS.BACKSPACE || keyCode == KEYS.DELETE) {

                  /*
                    if (isContentEditableObject()) {
                        getContentEditableObject().remove();
                        event.preventDefault();
                    }*/
                } else if (keyCode == KEYS.LEFT || keyCode == KEYS.RIGHT || keyCode == KEYS.UP || keyCode == KEYS.DOWN) {

                  /*
                    if (isContentEditableObject() && getContentEditableObject() !== document.activeElement) {
                        getContentEditableObject().focus();
                        event.preventDefault();
                    } else if (isContentEditableObject() && getContentEditableObject() == document.activeElement) {
                        getContentEditableObject().blur();
                    }*/
                }
            });
          }


        function disableAvoidedElements(element, configuration) {
            element.on("keypress", function(event) {
                if (configuration.avoid.indexOf(event.key) != -1) {
                    event.preventDefault();
                }
            });

            element.on("paste", function(event) {
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

    }]);

}());
