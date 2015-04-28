/**
 * Created by Shipt
 */

(function () {
    'use strict';

    angular.module('app').controller('projectDetailController', [
        '$scope',
        '$log',
        '$ionicPopover',
        'localStorageService',
        'projectService',
        'githubService',
        '$stateParams',
        projectDetailController]);

    function projectDetailController($scope,$log,$ionicPopover, localStorageService, projectService,githubService,$stateParams) {
        var viewModel = this;
        viewModel.title = '';

        //commit_id: "a4a17743ea251758e0ea183e469283b4c9a37dd8"

        viewModel.getGithubUserData = function () {
            angular.forEach(viewModel.project.builds, function(build) {
                githubService.getUser(build.github_username)
                    .then(function (data) {
                        $log.debug('githubUser', data);
                        build.githubUser = data;

                    }, function (error) {

                    });
            });
        };

        viewModel.getDateString = function (build) {
            return moment(build.started_at).format("MM/DD/YY h:mm a");;
        };

        viewModel.getBuildTime = function (build) {
            var a = moment(build.started_at);
            var b = moment(build.finished_at);
            return b.diff(a, 'minutes', true); // 1.5
        };

        viewModel.doRefresh = function() {
            loadData()
        };

        viewModel.getBuildItemClass = function(build) {
            if(build.status == 'success') {
                return 'build-success-item';
            }
            if(build.status == 'error') {
                return 'build-error-item';
            }
        };

        viewModel.badgeClass = function(build) {
            if(build.status == 'success') {
                return 'badge-balanced';
            }
            if(build.status == 'error') {
                return 'badge-assertive';
            }
            return 'badge-positive';
        };

        viewModel.clickBuild = function($event, build) {
            $scope.detailBuild = build;
            $ionicPopover.fromTemplateUrl('build-popover.html', {
                scope: $scope
            }).then(function(popover) {
                viewModel.popover = popover;
                viewModel.popover.show($event);
            });

        };

        $scope.restartBuildFromDetail = function() {
            //$scope.detailBuild
            projectService.restartBuild($scope.detailBuild)
                .then(function(data) {
                    $log.debug('restartBuild');
                    loadData();
                }, function(error){
                    $log.error('restartBuild');
                });

        };

        function loadData() {
            viewModel.project = angular.fromJson($stateParams.project);
            projectService.getProject(viewModel.project)
                .then(function(data){
                    $log.debug('project',data);
                    viewModel.project = data;
                    viewModel.getGithubUserData();
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(error){
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        loadData();
    }
})();


