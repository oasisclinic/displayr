angular.module('resourceUtils', []).factory('APIInterceptor', [ '$q', '$modal', function($q, $modal) {
    return {
    
        responseError: function(rejection) {
            var modalOptions = {};
            switch(rejection.status) {
                case 401:
                    modalOptions.templateUrl =  'views/modals/401.html' ;
                    break;
                case 403:
                    modalOptions.templateUrl = 'views/modals/403.html';
                    break;
                case 404:
                    modalOptions.templateUrl = 'views/modals/404.html';
                   break;
                case 500:
                    modalOptions.templateUrl = 'views/modals/500.html';
                    break;
                default:
                    modalOptions.templateUrl = 'views/modals/error.html';
                    break;
            }
            $modal.open(modalOptions);           
            return $q.reject(rejection);
        },
    };
}]);
