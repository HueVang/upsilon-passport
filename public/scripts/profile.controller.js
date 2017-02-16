angular.module('soloApp').controller('ProfileController', function($http, $location) {
  console.log('ProfileController loaded');

  var ctrl = this;
  ctrl.user_info = {"firstName" : "",
  "lastName" : "",
  "image" : "",
  "personalSummary" : "",
  "cohort" : "",
  "title" : "",
  "location_name" : "",
  "facts" : ""
  };

  console.log('This is user info object: ', ctrl.user_info);


  ctrl.getCohorts = function() {
     $http.get('/profile/cohorts').then(function(response) {
      ctrl.cohorts = response.data;
      console.log('This is the cohorts data: ',response.data);
    }).catch(function(err) {
      console.log('error getting response from the cohorts :', err);
    });
  }; // end getCohorts function

  ctrl.getCohorts();

  ctrl.edit = function() {
    $location.path('/profile-edit');
  }; //end edit function

  ctrl.cancel = function() {
    $location.path('/profile');
  }; // end cancel function

  ctrl.saveChanges = function(userInfo) {
    console.log('This is the user\'s info: ', userInfo);
    return $http.post('/profile/post', userInfo).then(function(response) {
      return response;
    }).catch(function(err) {
      console.log('error getting response from profile.js: ', err);
    });
  }; // end saveChanges function

  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }

}); // end ProfileController
