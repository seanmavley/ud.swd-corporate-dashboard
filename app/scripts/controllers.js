angular.module('appController', [])

.constant('refreshTime', 50000000)

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
}])

.controller('view3', ['$scope', 'dataLoad', 'csvToArray', '$interval', 'refreshTime',
  function($scope, dataLoad, csvToArray, $interval, refreshTime) {
    $scope.sortType = 'company';
    $scope.sortReverse = false;
    $scope.searchTable = '';

    var refresh = function() {
      console.log('View Data 3 (re)loaded');
      dataLoad.getData('view3', 'data.csv')
        .success(function(data) {
          var arrayData = csvToArray(data);

          // Both approaches work.
          // See discussion here: 
          // http://stackoverflow.com/questions/40489345/transform-all-array-keys-with-values-from-another-array

          var keys = arrayData.shift();
          var result = arrayData.map(function(row) {
            var current = {};
            for (var i = 0; i < keys.length; i++) {
              current[keys[i]] = row[i];
            }
            return current;
          })

          $scope.reports = result;

          // result = arrayData.map(function(a, _, aa) {
          //   var object = {};
          //   aa[0].forEach(function(key, i) {
          //     object[key] = a[i];
          //   });
          //   return object;
          // }).slice(1);

        })
    }

    var intervalPromise = $interval(function() {
      console.log('Refreshed data after 5 seconds');
      refresh();
    }, refreshTime); // load refresh() every 5 minute

    // load first time
    refresh();

    $scope.$on('$destroy', function() {
      console.log('Interval cancelled');
      $interval.cancel(intervalPromise);
    })
  }
])
