angular.module('soloApp').controller('CohortsController', function($http, $location) {
  console.log('CohortsController loaded');

  var ctrl = this;

  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }


}); // end CohortsController
