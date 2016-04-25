angular.module('FileService', [])
    
    .factory('dataLoad', [function(){
        return {
            getView: function (text) {
                return 'Saying hello from ' + text;
            }
        };
    }])