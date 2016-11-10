angular.module('corp')
  .controller('view1', ['$scope', 'dataLoad', 'refreshTime', '$interval',
  function($scope, dataLoad, refreshTime, $interval) {
    // create empty object. Without it, "No data to display" error
    $scope.myMap = {};

    var refresh = function() {
      console.log('View 1 Data (re)loaded.');
      dataLoad.getData('view1', 'data.json')
        .success(function(data) {
          $scope.myMap = data;
        });
    }

    var intervalPromise = $interval(function() {
      console.log('Refreshed data after 5 seconds');
      refresh();
    }, refreshTime);

    refresh();

    $scope.$on('$destroy', function() {
      console.log('Interval cancelled');
      $interval.cancel(intervalPromise);
    })

    $scope.applySettings = function() {
      if ($scope.settings) {
        $scope.myMap.chart.caption = $scope.settings.title;
        $scope.myMap.chart.subCaption = $scope.settings.subtitle;
        $scope.myMap.chart.entityFillColor = $scope.settings.color;
      } else {
        Materialize.toast('Kindly select some settings', 5000);
      }
    }
  }
])