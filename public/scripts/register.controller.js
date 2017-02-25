angular.module('soloApp').controller('RegisterController', function($http, $location){
  console.log('RegisterController loaded');
  var ctrl = this;

  ctrl.register = function() {
    console.log('creating a new user');

    $http.post('/register', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      console.log(response);
      $location.path('/profile-edit');
    }, function(error) {
      console.log('error registering new user', error);
    });
  };

  ctrl.login = function() {
    console.log('logging in');
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      console.log(response);
      $location.path('/home');
    }, function(error) {
      console.log('error logging in', error);
    });
  };
});
