/**
 * Created by Shipt
 */

(function () {
    'use strict';

    angular.module('app').controller('settingsController', [
        '$scope',
        'localStorageService',
        settingsController]);

    function settingsController($scope, localStorageService) {
        var viewModel = this;


        function loadData() {
            viewModel.apiKey = localStorageService.getApiKey();
        }

        viewModel.saveApiKey = function() {
            localStorageService.saveApiKey(viewModel.apiKey);
        };

        loadData();
    };
})();


