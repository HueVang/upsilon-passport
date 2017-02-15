// routing
angular
  .module("soloApp")
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "HomeController as home",
        authRequired: true
      })
      .when("/", {
        templateUrl: "views/home-guest.html",
        controller: "LoginController as login"
      })
      .when("/newUser", {
        templateUrl: "views/register.html",
        controller: "RegisterController as register"
      })
      .when("/profile-edit", {
        templateUrl: "views/profile-edit.html",
        controller: "ProfileController as profile"
      })
      .when("/profile" , {
        templateUrl: "views/profile.html",
        controller: "ProfileController as profile"
      })
      .when("/cohorts-guest", {
        templateUrl: "views/cohorts-guest.html",
        controller: "CohortsGuestController as cohortsGuest"
      })
      .when("/cohorts", {
        templateUrl: "views/cohorts.html",
        controller: "CohortsController as cohorts",
        authRequired: true
      })
      .otherwise({
        templateUrl: "views/login.html",
        controller: "LoginController as login"
      });
  })
  .run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      AuthService.checkLoginStatus().then(function(loggedIn) {
        console.log(loggedIn);
        if (next.authRequired && !loggedIn) {
          $location.path("/login");
          $route.reload();
        }
      });
    });
  });
