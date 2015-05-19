
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

        viewModel.clickProject = function(project) {
            $state.go('app.projectDetail', {project: angular.toJson(project)});
        };

        viewModel.doRefresh = function() {
            loadData()
        };

        viewModel.getProjects = function() {
          return viewModel.projects;
        };
        
        function loadData() {
            viewModel.apiKey = localStorageService.getApiKey();
            if(viewModel.apiKey == null) {
              setTimeout(watchBuilds, 1000);
            }
            projectService.getProjects()
                .then(function(data){
                    viewModel.projects = data.projects;
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(error){

                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        $scope.$on('$ionicView.beforeEnter', function() {
            loadData();
        });

    }
})();
