/// <reference path="../node_modules/definitely-typed-angular/angular.d.ts" />
angular.module('calculatorApp').controller('MainCtrl', ['$interval', '$filter', function ($interval : ng.IIntervalService, $filter : ng.IFilterService) {
    let self = this; //is this necessary in Typescript?
    self.windowText = '';
    self.mode = 'Num';
    self.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'π'];

    var lookups : any = new Object;
    lookups["π"] = 3.14159265359;

    self.numeralClick = function ($event : any) {
        let pressedButton: HTMLInputElement = $event.currentTarget as HTMLInputElement;
        self.windowText += pressedButton.value.toString();
    }

    self.spaceClick = function () {
        self.windowText += ' ';
    }

    self.negativeClick = function () {
        if (self.windowText.length > 0) {
            let operands: string = self.windowText as string;
            let ops: string[] = operands.split(" ");
            if (ops[ops.length - 1].indexOf('-') > -1) {
                ops[ops.length - 1] = ops[ops.length - 1].replace('-', '');
            } else {
                ops[ops.length - 1] = "-" + ops[ops.length - 1];
            }
            self.windowText = ops.join(' ');
        }
    }

    function apply(operands: string, operation: string): number {
        let ops: string[] = $filter('variableReplacement')(operands, lookups).split(" ");
        let firstNumber = ops.shift();
        let accumulator : number = 0;
        if (firstNumber) {
            accumulator = +firstNumber;
        }
        
        for (let cur of ops) {
            let currentNumber: number = 0;
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

    self.operationClick = function ($event : any) {
        let pressedButton: HTMLInputElement = $event.currentTarget as HTMLInputElement;
        let result: number = apply(self.windowText, pressedButton.value.toString());
        self.windowText = result.toString() + ' ';
    }

    self.modeChange = function () {
        if (self.mode === 'Num') {
            self.mode = 'Alpha';
            window.location.href = '#!alpha';

        } else {
            self.mode = 'Num';
            window.location.href = '#!';
        }
    }

    self.timerClick = function () {
        if (!angular.isDefined(self.countDown)) {
            let timerValue: number = +self.windowText;
            self.countDown = $interval(iterate, 1000, timerValue);
        } else {
            $interval.cancel(self.countDown);
            delete self.countDown;
        }

    }

    function iterate() {
        let currentValue: number = +self.windowText;
        currentValue--;
        self.windowText = currentValue.toString();
    }

    self.backClick = function () {
        let wText: string = self.windowText;
        wText = wText.substring(0, wText.length - 1);
        self.windowText = wText;
    }

    self.storeClick = function () {
        let ops: string[] = (self.windowText as string).split(' ');
        if (ops.length != 2) {
            self.windowText = 'error';
        } else {
            lookups[ops[0] as string] = +ops[1];
        }
    }
}])