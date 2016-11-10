angular.module('corp')
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
