angular.module('FileService', [])
    
  .factory('dataLoad', ['$http', function($http){
    return {
      getData: function (view, filename) {
        return $http.get('data/' + view + '/' + filename);
      }
    };
  }])