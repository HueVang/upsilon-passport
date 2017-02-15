angular.module('soloApp').controller('ProfileController', function($http, $location) {
  console.log('ProfileController loaded');

  var ctrl = this;

  ctrl.getCohorts = function() {
     $http.get('/profile/cohorts').then(function(response) {
      ctrl.cohorts = response.data;
      console.log('This is the cohorts data: ',response.data);
    }).catch(function(err) {
      console.log('error getting response from the cohorts :', err);
    });
  }; // end getCohorts function

  ctrl.getCohorts();

  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }

}); // end ProfileController
