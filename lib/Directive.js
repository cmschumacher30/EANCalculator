"use strict";
angular.module('calculatorApp').directive('bmode', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            // read element attribute if it exists
            var firstValue = attrs.defValue;
            var altValue = attrs.altValue;
            el.val(firstValue);
            var firstColor = attrs.defColor;
            var altColor = attrs.altColor;
            el.css('background-color', firstColor);
            // define callback for vanilla DOM click event
            el.bind('click', function () {
                var newValue = altValue;
                var newColor = altColor;
                if (el.val() === altValue) {
                    newValue = firstValue;
                    newColor = firstColor;
                }
                el.val(newValue);
                el.css('background-color', newColor);
            });
        }
    };
});
