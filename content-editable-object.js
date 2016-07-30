(function() {
    "use strict";

    angular.module("content-editable").directive("contenteditableObject", function(KEYS) {
        return {
            restrict: "A",
            require: "?contenteditable",
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


            element.on("focues", function(event) {
                return event.preventDefault();
            });


            element.on("keypress", function(event) {
                if (event.keyCode == KEYS.BACKSPACE || event.keyCode == KEYS.DELETE) {
                    console.log(event);
                }
            });
        }
    });

}());
