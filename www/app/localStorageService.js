/**
 * Created by Shipt
 */


(function () {
    'use strict';

    var serviceId = 'localStorageService';

    angular.module('app').factory(serviceId, [
        '$http',
        '$q',
        '$timeout',
        '$log',
        AccountService]);

    function AccountService($http,
                            $q,
                            $timeout,
                            $log) {


        var service = {
            getApiKey: getApiKey,
            saveApiKey: saveApiKey
        };

        return service;

        function getApiKey() {
            var key = null;
            var keyString = window.localStorage['api-key'];
            if(keyString) {
                key = angular.fromJson(keyString);
            }
            return key;
        }

        function saveApiKey(apiKey) {
            window.localStorage['api-key'] = angular.toJson(apiKey);
        }

    }
})();