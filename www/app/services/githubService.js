
(function () {
    'use strict';

    var serviceId = 'githubService';

    angular.module('app').factory(serviceId, [
        '$http',
        '$q',
        '$timeout',
        '$log',
        githubService]);

    function githubService($http,
                            $q,
                            $timeout,
                            $log) {


        var service = {
            getUser: getUser
        };

        return service;

        function getUser(userName) {
            var defer = $q.defer();
            var req = {
                method: 'GET',
                url: 'https://api.github.com/users/'+ userName
            };
            $http(req)
                .success(function(data){
                    //success
                    defer.resolve(data);
                })
                .error(function(error){
                    $log.error('getUser', error);
                    //error
                    defer.reject(error);
                });
            return defer.promise;
        }

    }
})();