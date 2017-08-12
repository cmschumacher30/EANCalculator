"use strict";
/// <reference path="../node_modules/definitely-typed-angular/angular.d.ts" />
angular.module('calculatorApp').controller('MainCtrl', ['$interval', '$filter', function ($interval, $filter) {
        var self = this; //is this necessary in Typescript?
        self.windowText = '';
        self.mode = 'Num';
        self.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'π'];
        var lookups = new Object;
        lookups["π"] = 3.14159265359;
        self.numeralClick = function ($event) {
            var pressedButton = $event.currentTarget;
            self.windowText += pressedButton.value.toString();
        };
        self.spaceClick = function () {
            self.windowText += ' ';
        };
        self.negativeClick = function () {
            if (self.windowText.length > 0) {
                var operands = self.windowText;
                var ops = operands.split(" ");
                if (ops[ops.length - 1].indexOf('-') > -1) {
                    ops[ops.length - 1] = ops[ops.length - 1].replace('-', '');
                }
                else {
                    ops[ops.length - 1] = "-" + ops[ops.length - 1];
                }
                self.windowText = ops.join(' ');
            }
        };
        function apply(operands, operation) {
            var ops = $filter('variableReplacement')(operands, lookups).split(" ");
            var firstNumber = ops.shift();
            var accumulator = 0;
            if (firstNumber) {
                accumulator = +firstNumber;
            }
            for (var _i = 0, ops_1 = ops; _i < ops_1.length; _i++) {
                var cur = ops_1[_i];
                var currentNumber = 0;
                currentNumber = +cur;
                switch (operation) {
                    case "+":
                        accumulator += currentNumber;
                        break;
                    case "-":
                        accumulator -= currentNumber;
                        break;
                    case "X":
                        accumulator *= currentNumber;
                        break;
                    case "÷":
                        accumulator /= currentNumber;
                        break;
                }
            }
            return accumulator;
        }
        self.operationClick = function ($event) {
            var pressedButton = $event.currentTarget;
            var result = apply(self.windowText, pressedButton.value.toString());
            self.windowText = result.toString() + ' ';
        };
        self.modeChange = function () {
            if (self.mode === 'Num') {
                self.mode = 'Alpha';
                window.location.href = '#!alpha';
            }
            else {
                self.mode = 'Num';
                window.location.href = '#!';
            }
        };
        self.timerClick = function () {
            if (!angular.isDefined(self.countDown)) {
                var timerValue = +self.windowText;
                self.countDown = $interval(iterate, 1000, timerValue);
            }
            else {
                $interval.cancel(self.countDown);
                delete self.countDown;
            }
        };
        function iterate() {
            var currentValue = +self.windowText;
            currentValue--;
            self.windowText = currentValue.toString();
        }
        self.backClick = function () {
            var wText = self.windowText;
            wText = wText.substring(0, wText.length - 1);
            self.windowText = wText;
        };
        self.storeClick = function () {
            var ops = self.windowText.split(' ');
            if (ops.length != 2) {
                self.windowText = 'error';
            }
            else {
                lookups[ops[0]] = +ops[1];
            }
        };
    }]);
