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
        viewModel.githubUsers = [];
        var githubUsersRequested = [];

        viewModel.getGithubUserData = function () {
            $log.debug('viewModel.githubUsers',viewModel.githubUsers );
            angular.forEach(viewModel.project.builds, function(build) {
                //only call to get the user if we dont already have it
                if(!_.contains(githubUsersRequested, build.github_username)) {
                    githubUsersRequested.push(build.github_username);
                    githubService.getUser(build.github_username)
                        .then(function (data) {
                            build.githubUser = data;
                            viewModel.githubUsers.push(data);
                        }, function (error) {

                        });
                }
            });
        };

        viewModel.getGithubUser = function(name) {
            return _.find(viewModel.githubUsers, function(user){ return user.login == name; });
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
            if(build.status == 'testing') {
                return 'badge-positive';
            }
            return 'badge-stable';
        };

        viewModel.clickBuild = function($event, build) {

        };

        viewModel.commitClicked = function(build) {
            var url = "https://github.com/" + viewModel.project.repository_name + "/commit/" + build.commit_id;
            window.open(url, '_system', 'location=yes'); return false;
        };

        viewModel.restartBuild = function (build) {
            if(build.status == 'testing'){
                return;
            }
            projectService.restartBuild(build)
                .then(function(data) {
                    $log.debug('restartBuild');
                }, function(error){
                    $log.error('restartBuild');
                });
        };

        function loadData () {
            viewModel.project = angular.fromJson($stateParams.project);
            projectService.getProject(viewModel.project)
                .then(function(data){
                    //$log.debug('project',data);
                    viewModel.project = data;
                    viewModel.getGithubUserData();
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(error){
                    $scope.$broadcast('scroll.refreshComplete');
                });

            watchBuilds();
        }

        function watchBuilds () {
            $log.debug('watchBuilds called');
            projectService.getProject(viewModel.project)
                .then(function(data){
                    angular.forEach(data.builds, function(build) {
                        var buildMatch = _.find(viewModel.project.builds, function(oldbuild){ return oldbuild.uuid == build.uuid; });
                        if (!buildMatch) {
                            viewModel.project.builds.push(build)
                        } else {
                            buildMatch.status = build.status;
                            buildMatch.started_at = build.started_at;
                            buildMatch.finished_at = build.finished_at;
                        }
                    });
                }, function(error){
                });

            setTimeout(watchBuilds, 2000);
        }
        
        viewModel.getBuilds = function() {
           return viewModel.project.builds;  
        };
        
        $scope.$on('$ionicView.beforeEnter', function() {
            loadData();
        });

        viewModel.optionsClick = function() {

        }

        //loadData();
    }
})();


