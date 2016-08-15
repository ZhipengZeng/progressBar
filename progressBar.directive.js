(function () {
    // example steps array
    // var steps = [{
    //     name: 'step 1',
    //     done: false
    // }];
    angular.module("app").directive('progressBar', function () {
        return {
            require: 'ngModel',
            restrict: 'E',
            scope: true,
            controller: function ($scope) {
                $scope.$watch('$parent.progressSteps.length', function (newValue, oldValue) {
                    $scope.liWidth = 100 / newValue + '%';
                });
            },
            template: '<ul class="progressbar"><li ng-style="{\'width\':liWidth}" ng-class="{\'active\':step.done, customDoneColor:customDoneColor}" ng-repeat="step in progressSteps" ng-bind="step.name"></li></ul>',
            link: function (scope, element, attrs, model) {
                // could have the custom done color style
                if (attrs.customDoneColor) {
                    var cssFragment1 = {
                        selector: '.progressbar li.active',
                        rules: [
                            'color: ' + attrs.customDoneColor
                        ]
                    };
                    var cssFragment2 = {
                        selector: '.progressbar li.active:before',
                        rules: [
                            'border-color: ' + attrs.customDoneColor
                        ]
                    };
                    var cssFragment3 = {
                        selector: '.progressbar li.active + li:after',
                        rules: [
                            'background-color: ' + attrs.customDoneColor
                        ]
                    };
                    var cssFragmentSheet = cssFragment1.selector + '{' + cssFragment1.rules.join(';') + '}'
                        + cssFragment2.selector + '{' + cssFragment2.rules.join(';') + '}'
                        + cssFragment3.selector + '{' + cssFragment3.rules.join(';') + '}';

                    // append a new stylesheet to the head
                    angular.element(document).find('head').append('<style type="text/css">' + cssFragmentSheet + '</style>');
                }
            },
            replace: true
        }
    });
})();


