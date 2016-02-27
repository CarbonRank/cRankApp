// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('cRank', ['ionic', 'cRank.services', 'ngCordova', 'uiGmapgoogle-maps', 'ngMessages'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('main', {
    url: '/main',
    templateUrl : 'templates/main.html',
    abstract: true,
    controller: 'MainCtrl'
  })

  .state('userInfo', {
    url: '/userInfo',
    templateUrl : 'templates/userInfo.html',
    controller: 'UserInfoCtrl'
  })

  .state('registration', {
    url: '/registration',
    templateUrl : 'templates/register.html',
    controller: 'RegisterCtrl'
  })

  .state('main.drive', {
    url: '/drive',
    views: {
      'tab-drive': {
        templateUrl: 'templates/tab-drive.html',
        controller: 'DriveCtrl'/*,
        views: {
          start: { templateUrl: 'templates/drive/drive-start.html'},
          driving: { templateUrl: 'templates/drive/drive-driving.html'}
        }*/
      }
    }
  })

  .state('main.rank', {
      url: '/rank',
      views: {
        'tab-rank': {
          templateUrl: 'templates/tab-rank.html',
          controller: 'RankCtrl'
        }
      }
    })
    .state('main.activity', {
      url: '/activity',
      views: {
        'tab-activity': {
          templateUrl: 'templates/tab-activity.html',
          controller: 'ActivityCtrl'
        }
      }
    })

  .state('main.stats', {
    url: '/stats',
    views: {
      'tab-stats': {
        templateUrl: 'templates/tab-stats.html',
        controller: 'StatsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main/drive');

});
