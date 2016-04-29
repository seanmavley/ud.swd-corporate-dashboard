angular.module('corp', ['ngRoute', 'appController', 'FileService', 'ng-fusioncharts'])

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
