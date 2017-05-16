// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ngStorage', 'ionic', 'starter.controllers'])

.run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // Global variables
        $rootScope.aesValidateFace = 'AESKey1';
        $rootScope.normalMewSeparator = '_(^-.-^)_';

        var codePushUpdateDialog = {
            updateTitle: "New update available!!!",
            optionalIgnoreButtonLabel: "Nope..",
            optionalInstallButtonLabel: "Yep.."
        }

        codePush.sync(null, { updateDialog: codePushUpdateDialog, installMode: InstallMode.IMMEDIATE });
        
        
    });
})

.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {

    //$compileProvider.imgSrcSanitizationWhitelist(/^\s(https|file|blob|cdvfile):|data:image\//);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);

    $stateProvider
      .state('app', {
          url: '/app',abstract: true,controller: 'AppCtrl',cache: false,
          templateUrl: 'templates/menu.html'
          
      })
      .state('app.login', {
          url: '/login',controller: 'LoginCtrl',cache: false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/login.html'
              }
          }          
      })
         .state('app.register', {
             url: '/register',controller: 'RegisterCtrl',cache: false,
             views: {
                 'menuContent': {
                     templateUrl: 'templates/Register.html'
                 }
             }             
         })
      .state('app.dashboard', {
          url: '/dashboard',controller: 'DashboardCtrl',cache: false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/dashboard.html'
              }
          }          
      })
       .state('app.nearcafe', {
           url: '/nearcafe',controller: 'NearCafeCtrl',cache: false,
           views: {
               'menuContent': {
                   templateUrl: 'templates/nearcafe.html'
               }
           }           
       })
         .state('app.cafeinfo', {
             url: '/cafeinfo',controller: 'CafeInfoCtrl',cache: false,
             views: {
                 'menuContent': {
                     templateUrl: 'templates/cafeinfo.html'
                 }
             }            
         })
    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
