angular.module('FileService', [])
    
    .factory('dataLoad', ['$http', function($http){
        return {
            getData3: function (text) {
                return $http.get('data/view3/data.json');
            }
        };
    }])