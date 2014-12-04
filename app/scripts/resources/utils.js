// angular.module('resourceUtils', []).factory('APIInterceptor', [ '$q', '$rootScope',  function($q, $rootScope) {
//     return {
    
//         responseError: function(rejection) {
//             var modalOptions = {
//                 controller: 'ModalerrorCtrl',
//                 resolve: {},
//             };
//             switch(rejection.status) {
//                 case 401:
//                     modalOptions.templateUrl =  'views/modals/401.html' ;
//                     break;
//                 case 403:
//                     modalOptions.templateUrl = 'views/modals/403.html';
//                     break;
//                 case 404:
//                     modalOptions.templateUrl = 'views/modals/404.html';
//                     modalOptions.resolve.error = function() { return "404";};
//                     modalOptions.resolve.body = function() { return "We couldn't find the patients on the server. Please contact a server administrator.";};
//                    break;
//                 case 500:
//                     modalOptions.templateUrl = 'views/modals/500.html';
//                     break;
//                 default:
//                     break;
//             }
//             $rootScope.$broadcast('apiError', modalOptions);
//             return $q.reject(rejection);
//         },
//     };
// }]);
