/**
 * Created by Shipt
 */

(function () {
    'use strict';

    angular.module('app').controller('projectDetailController', [
        '$scope',
        '$log',
        'localStorageService',
        'projectService',
        '$stateParams',
        projectDetailController]);

    function projectDetailController($scope,$log, localStorageService, projectService,$stateParams) {
        var viewModel = this;
        viewModel.title = '';



        function loadData() {
            var project = angular.fromJson($stateParams.project);
            projectService.getProject(project)
                .then(function(data){
                    $log.debug('project',data);
                    viewModel.project = data;
                }, function(error){

                });
        }

        loadData();
    }
})();


