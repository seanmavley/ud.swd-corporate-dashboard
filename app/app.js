angular.module('corp', ['ngRoute', 'FileService'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'view1'
            })
            .when('/view2', {
                templateUrl: 'templates/view2.html',
                controller: 'view2'
            })
            .when('/view3', {
                templateUrl: 'templates/view3.html',
                controller: 'view3'
            })
            .otherwise({
                redirectTo: '/'
            })
    }])

    .controller('view1', ['$scope', 'dataLoad', function($scope, dataLoad) {
        $scope.data = dataLoad.getView('text');
    }])

    .controller('view2', ['$scope', function($scope) {
        $scope.data = 'I am view 2';
    }])

    .controller('view3', ['$scope', function($scope){
        $scope.data = 'I am view 3';
    }])
