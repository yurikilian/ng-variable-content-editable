(function() {
    "use strict";

    angular.module("content-editable")
        .directive("contenteditableObject", contentEditableObject);

    contentEditableObject.$inject = ['KEYS'];

    function contentEditableObject(KEYS) {
        return {
            restrict: "A",
            link: directiveDefinition
        };

        function directiveDefinition(scope, element) {
            blockEdition(element);
            bindEvents(element);
        }

        function blockEdition(element) {
            angular.element(element).attr("contenteditable", "false");
        }

        function bindEvents(element) {
            element.bind("click", function(event) {
                event.preventDefault();
            });


            element.on("focus", function(event) {
                return event.preventDefault();
            });


            element.on("keypress", function(event) {
                if (event.keyCode == KEYS.BACKSPACE || event.keyCode == KEYS.DELETE) {
                    console.log(event);
                }
            });
        }
    }
}());
