angular.module('app', []).controller('IndexController', indexController);

function indexController($scope) {
    $scope.progressSteps = [
        {
            name: 'step 1',
            done: true
        },
        {
            name: 'step 2',
            done: false
        },
        {
            name: 'step 3',
            done: false
        },
        {
            name: 'step 4',
            done: false
        }
    ];
    $scope.nextText = 'Next';
    $scope.next = function () {
        for (var i = 0; i < $scope.progressSteps.length; i++) {
            if (!$scope.progressSteps[i].done) {
                $scope.progressSteps[i].done = true;
                if(i === $scope.progressSteps.length-2){
                    $scope.nextText = 'Done';
                }
                return;
            }
        }
    };
    $scope.add = function () {
        $scope.progressSteps.push({name: 'step ' + ($scope.progressSteps.length + 1), done: false});
        $scope.nextText = 'Next';
        if($scope.progressSteps[$scope.progressSteps.length-2].done && !$scope.progressSteps[$scope.progressSteps.length-1].done || $scope.progressSteps[$scope.progressSteps.length-1].done){
            $scope.nextText = 'Done';
        }
    };
    $scope.delete = function () {
        if ($scope.progressSteps.length <= 2) {
            return;
        }
        $scope.progressSteps.pop();
        if($scope.progressSteps[$scope.progressSteps.length-2].done && !$scope.progressSteps[$scope.progressSteps.length-1].done || $scope.progressSteps[$scope.progressSteps.length-1].done){
            $scope.nextText = 'Done';
        }
    };
}
