angular.module('resourceUtils', []).factory('APIInterceptor', [ '$q', '$modal', function($q, $modal) {
    return {
    
        responseError: function(rejection) {
            $modal.open({});
            return $q.reject(rejection);
        },
    };
}]);
