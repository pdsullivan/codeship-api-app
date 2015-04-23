/**
 * Created by Shipt
 */


(function () {
    'use strict';

    var serviceId = 'projectService';

    angular.module('app').factory(serviceId, [
        '$http',
        '$q',
        '$timeout',
        '$log',
        'localStorageService',
        projectService]);

    function projectService($http,
                            $q,
                            $timeout,
                            $log,
                            localStorageService) {


        var service = {
            getProjects: getProjects,
            getProject: getProject,
            restartBuild: restartBuild
        };

        var baseUrl = 'https://codeship.com/';
        return service;

        function getProjects() {
            var apiKey = localStorageService.getApiKey();
            var defer = $q.defer();
            var req = {
                method: 'GET',
                url: baseUrl + '/api/v1/projects.json?api_key=' + apiKey
            };
            $http(req)
                .success(function(data){
                    //success
                    $log.info('getProjects success', data);
                    defer.resolve(data);
                })
                .error(function(error){
                    $log.error('getProjects', error);
                    //error
                    defer.reject(error);
                });
            return defer.promise;
        }

        function restartBuild(build) {
            var apiKey = localStorageService.getApiKey();
            var defer = $q.defer();
            var req = {
                method: 'POST',
                url: baseUrl + '/api/v1/builds/'+build.id+'/restart.json?api_key=' + apiKey,
                data: {
                    "id": build.id,
                    "uuid": build.uuid
                }
            };
            $http(req)
                .success(function(data){
                    //success
                    $log.info('getProjects success', data);
                    defer.resolve(data);
                })
                .error(function(error){
                    $log.error('getProjects', error);
                    //error
                    defer.reject(error);
                });
            return defer.promise;
        }

        function getProject (project) {
            //api/v1/projects/:project_id.json
            var apiKey = localStorageService.getApiKey();
            var defer = $q.defer();
            var req = {
                method: 'GET',
                url: baseUrl + 'api/v1/projects/'+project.id+'.json?api_key=' + apiKey
            };
            $http(req)
                .success(function(data){
                    //success
                    $log.info('getProjects success', data);
                    defer.resolve(data);
                })
                .error(function(error){
                    $log.error('getProjects', error);
                    //error
                    defer.reject(error);
                });
            return defer.promise;
        }

    }
})();