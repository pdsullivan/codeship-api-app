
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

        function humanize(time){
            if(time.years   > 0){   return time.years   + ' years and '     + time.months   + ' months';}
            if(time.months  > 0){   return time.months  + ' months and '    + time.days     + ' days';}
            if(time.days    > 0){   return time.days    + ' days and '      + time.hours    + ' hours';}
            if(time.hours   > 0){   return time.hours   + ' hours and '     + time.minutes  + ' minutes and ' + time.seconds + ' seconds';}
            if(time.minutes > 0){   return time.minutes + ' minutes and '   + time.seconds  + ' seconds';}
            if(time.seconds > 0){   return time.seconds + ' seconds';}
            return "";
        }

        viewModel.getBuildTime = function (build) {
            var a = moment(build.started_at);
            var b = moment(build.finished_at);
            //return b.diff(a, 'minutes', true); // 1.5
            var timeLeftInSeconds = b.diff(a, true);
            var time = {
              years : Math.round(moment.duration(timeLeftInSeconds).years()),
              months : Math.round(moment.duration(timeLeftInSeconds).months()),
              days : Math.round(moment.duration(timeLeftInSeconds).days()),
              hours : Math.round(moment.duration(timeLeftInSeconds).hours()),
              minutes : Math.round(moment.duration(timeLeftInSeconds).minutes()),
              seconds : Math.round(moment.duration(timeLeftInSeconds).seconds())
            };

            return  humanize(time); // 1.5
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
                  projectService.getProject(viewModel.project)
                      .then(function(data){
                          //$log.debug('project',data);
                          viewModel.project = data;
                          viewModel.getGithubUserData();
                          $scope.$broadcast('scroll.refreshComplete');
                      }, function(error){
                          $scope.$broadcast('scroll.refreshComplete');
                      });
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
                            viewModel.project.builds.unshift(build);
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
