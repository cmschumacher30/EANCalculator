/// <reference path="../node_modules/definitely-typed-angular/angular.d.ts" />
/// <reference path="../node_modules/definitely-typed-angular/angular-route.d.ts" />


angular.module('calculatorApp', ['ngRoute'])
    .config(['$routeProvider',
        function ($routeProvider : ng.route.IRouteProvider) {
            $routeProvider.when('/', {
                templateUrl: '/numberpad.html'
            })
                .when('/alpha', {
                    templateUrl: '/alphapad.html'
                })
                .otherwise({ redirectTo: '/' });
        }
    ])
.filter('variableReplacement', function () {
    return function (text: string, lookup : any) {
        let results: string = '';
        let ops: string[] = text.split(" ");

        var numerals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '-'];
        for (let i = 0; i < ops.length; i++) {
            for (let j = 0; j < ops[i].length; j++) {
                if ($.inArray(ops[i][j], numerals) < 0) {
                    ops[i] = lookup[ops[i]];
                    continue;
                }
            }
        }
        results = ops.join(' ');
        return results;
    }
});


