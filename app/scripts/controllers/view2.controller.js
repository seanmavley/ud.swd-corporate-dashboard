angular.module('corp')
  .controller('view2', ['$scope', 'dataLoad', '$interval', 'refreshTime',
    function($scope, dataLoad, $interval, refreshTime) {
      // create empty object. Without it, "No data to display" error
      $scope.Zoomline = {};

      var refresh = function() {
        console.log('View 2 Data (re)loaded.');
        // refresh was called
        dataLoad.getData('view2', 'data1.json')
          .success(function(data) {
            $scope.Zoomline = data;
          });
      }

      refresh();

      var intervalPromise = $interval(function() {
        console.log('Refreshed data after 5 seconds');
        refresh();
      }, refreshTime); // load refresh() every 5 minute

      $scope.$on('$destroy', function() {
        console.log('Interval cancelled');
        $interval.cancel(intervalPromise);
      })

      $scope.applySettingsOne = function() {
        if ($scope.settings) {
          $scope.Zoomline.chart.caption = $scope.settings.one.title;
          $scope.Zoomline.chart.subCaption = $scope.settings.one.subtitle;
          $scope.Zoomline.chart.paletteColors = $scope.settings.one.color;
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

      $scope.applySettingsTwo = function() {
        if ($scope.settings.two) {
          $scope.Bar.chart.caption = $scope.settings.two.title;
          $scope.Bar.chart.subCaption = $scope.settings.two.subtitle;
          $scope.Bar.chart.paletteColors = $scope.settings.two.color;
        } else {
          Materialize.toast('Kindly select some settings', 5000);
        }
      }
    }
  ])
