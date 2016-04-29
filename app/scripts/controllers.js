angular.module('appController', [])

    .controller('view1', ['$scope', 'dataLoad', function($scope, dataLoad) {
        // create empty object. Without it, "No data to display" error
        $scope.myMap = {};
        dataLoad.getData('view1', 'data.json')
            .success(function(data) {
                $scope.myMap = data;
            });

        $scope.applySettings = function() {
            if ($scope.settings) {
                $scope.myMap.chart.caption = $scope.settings.title;
                $scope.myMap.chart.subCaption = $scope.settings.subtitle;
                $scope.myMap.chart.entityFillColor = $scope.settings.color;
            } else {
                Materialize.toast('Kindly select some settings', 5000);
            }
        }
    }])

    .controller('view2', ['$scope', 'dataLoad', function($scope, dataLoad) {
        // create empty object. Without it, "No data to display" error
        $scope.Zoomline = {};
        dataLoad.getData('view2', 'data1.json')
            .success(function(data) {
                $scope.Zoomline = data;
            });

        $scope.applySettingsOne = function() {
            if ($scope.settings.one) {
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

    .controller('view3', ['$scope', 'dataLoad', function($scope, dataLoad) {
        $scope.sortType = 'company';
        $scope.sortReverse = false;
        $scope.searchTable = '';

        dataLoad.getData('view3', 'data.json')
            .success(function(data) {
                $scope.reports = data;
            });
    }])
