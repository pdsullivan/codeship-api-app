/**
 * Created by Shipt
 */

(function () {
    'use strict';

    angular.module('app').controller('projectsController', [
        '$scope',
        '$log',
        '$state',
        'localStorageService',
        'projectService',
        projectsController]);

    function projectsController($scope,$log,$state, localStorageService, projectService) {
        var viewModel = this;
        viewModel.title = 'Projects';
        var apiKey = localStorageService.getApiKey();

        viewModel.clickProject = function(project) {
            $state.go('app.projectDetail', {project: angular.toJson(project)});
        };

        viewModel.doRefresh = function() {
            loadData()
        };

        function loadData() {
            projectService.getProjects()
                .then(function(data){
                    viewModel.projects = data.projects;
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(error){

                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        loadData();
    }
})();


