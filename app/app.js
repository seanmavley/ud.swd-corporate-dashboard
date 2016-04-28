angular.module('corp', ['ngRoute', 'FileService', 'ng-fusioncharts'])

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
    // $scope.data = dataLoad.getView('text');
}])

.controller('view2', ['$scope', 'dataLoad', function($scope, dataLoad) {
    // create empty object. Without it, "No data to display" error
    $scope.Zoomline = {};
    dataLoad.getData('view2', 'data1.json')
        .success(function(data) {
            $scope.Zoomline = data;
        });

  $scope.applySettings = function() {
    if($scope.settings) {
      $scope.Zoomline.chart.caption = $scope.settings.title;
      $scope.Zoomline.chart.subCaption = $scope.settings.subtitle;
      $scope.Zoomline.chart.paletteColors = $scope.settings.color;
    } else {
      Materialize.toast('Kindly select some settings', 5000);
    }
  }


    // create empty object. Without it, "No data to display" error
    $scope.Bar = {};
    dataLoad.getData('view2', 'data2.json')
        .success(function(data) {
            $scope.Bar = data;
        });
}])

.controller('view3', ['$scope', 'dataLoad', function($scope, dataLoad) {
    $scope.sortType = 'company';
    $scope.sortReverse = false;
    $scope.searchTable = '';

    dataLoad.getData('view3', 'data.json')
        .success(function(data) {
            $scope.reports = data;
        });
}])
