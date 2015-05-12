
angular.module('app', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "app/menu/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.projects', {
    url: "/projects",
    views: {
      'menuContent': {
        templateUrl: "app/projects/projects.html"
      }
    }
  })
  .state('app.projectDetail', {
    url: "/projectDetail/:project",
    views: {
      'menuContent': {
        templateUrl: "app/projects/projectDetail/projectDetail.html"
      }
    }
  })
  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "app/settings/settings.html"
      }
    }
  });
  $urlRouterProvider.otherwise('/app/projects');
});
