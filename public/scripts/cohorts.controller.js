angular.module('soloApp').controller('CohortsController', function($http, $location) {
  console.log('CohortsController loaded');

  var ctrl = this;
  ctrl.cohort = [];

  ctrl.showProfile = function(id) {
    console.log('This is the user id: ', 'user_' + id);
    console.log('showProfile works when clicked!');

    var el = document.getElementById(id);

  //  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }; // end showProfile




  ctrl.getCohorts = function() {
     $http.get('/cohorts/cohorts').then(function(response) {
      ctrl.cohorts = response.data;
      console.log('This is the cohorts data: ',response.data);
    }).catch(function(err) {
      console.log('error getting response from the cohorts :', err);
    });
  }; // end getCohorts function

  ctrl.getCohorts();

  ctrl.getCohort = function(cohortName) {
    console.log('This is cohortName ', cohortName);
     $http.get('/cohorts/' + cohortName).then(function(response) {
      ctrl.cohort = response.data;
      console.log('This is the cohort data: ',response.data);
    }).catch(function(err) {
      console.log('error getting response from the cohorts :', err);
    });
  }; // end getCohort function

  ctrl.getUsers = function() {
     $http.get('/cohorts/users').then(function(response) {
      ctrl.users = response.data;
      console.log('This is the users data: ',response.data);
    }).catch(function(err) {
      console.log('error getting response from the cohorts :', err);
    });
  }; // end getUsers function

  ctrl.getUsers();

  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }



}); // end CohortsController
