angular.module('soloApp').controller('ProfileController', function($http, $location) {
  console.log('ProfileController loaded');

  var ctrl = this;
  ctrl.user_info = [{"firstname" : "",
  "lastname" : "",
  "image" : "",
  "personalsummary" : "",
  "cohort" : "",
  "title" : "",
  "user_location" : "",
  "facts" : ""
}];

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

  ctrl.getUserInfo = function() {
    $http.get('/profile/userinfo').then(function(response) {
      ctrl.user_info = response.data;
      console.log('This is the user info: ', response.data);
      console.log('This is ctrl.user_info:', ctrl.user_info);
    }).catch(function(err) {
      console.log('error getting response from the user :', err);
    });
  }; // end getUserInfo function

  ctrl.getUserInfo();

  ctrl.edit = function() {
    $location.path('/profile-edit');
  }; //end edit function

  ctrl.cancel = function() {
    $location.path('/profile');
  }; // end cancel function

  ctrl.saveChanges = function(userInfo) {
    console.log('This is the user\'s info: ', userInfo);
    return $http.post('/profile/post', userInfo).then(function(response) {
      $location.path('/profile');
      // return response;
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
