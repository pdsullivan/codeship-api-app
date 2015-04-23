/**
 * Created by Shipt
 */

(function () {
    'use strict';

    angular.module('app').controller('settingsController', [
        '$scope',
        '$log',
        'localStorageService',
        settingsController]);

    function settingsController($scope,$log, localStorageService) {
        var viewModel = this;


        $scope.$watch('viewModel.apiKey', function(key){
            $log.debug('saving key');
            localStorageService.saveApiKey(viewModel.apiKey);
        });
        function loadData() {
            viewModel.apiKey = localStorageService.getApiKey();
        }

        viewModel.saveApiKey = function() {
            localStorageService.saveApiKey(viewModel.apiKey);
        };

        loadData();
    };
})();


