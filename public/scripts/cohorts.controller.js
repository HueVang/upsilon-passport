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

  ctrl.github = function(link) {
    if (link == null) {
      console.log('No github link');
    } else {
      console.log('This is the path ', link);
      window.location.href = (link);
    }
  }; // end github function

  ctrl.linkedin = function(link) {
    if (link == null) {
      console.log('No linkedin link');
    } else {
      window.location.href = (link);
    }
  }; // end linkedin function


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

  ctrl.getUsers = function() {
     $http.get('/home/usernames').then(function(response) {
      ctrl.usernames = response.data;

      // console.log('This is the usernames data: ',response.data);

      // selects random name from the ctrl.usernames array and then removes it from the array.
      var random1 = Math.floor(Math.random()*ctrl.usernames.length);
      var username = ctrl.usernames.splice(random1, 1)[0].username;
      // console.log('This is the usernames array : ', ctrl.usernames);
      var random2 = Math.floor(Math.random()*ctrl.usernames.length);
      var username2 = ctrl.usernames.splice(random2, 1)[0].username;
      // console.log('This is the usernames array : ', ctrl.usernames);
      var random3 = Math.floor(Math.random()*ctrl.usernames.length);
      var username3 = ctrl.usernames.splice(random3, 1)[0].username;
      // console.log('This is the usernames array : ', ctrl.usernames);
      // var random4 = Math.floor(Math.random()*ctrl.usernames.length);
      // var username4 = ctrl.usernames.splice(random4, 1)[0].username;
      ctrl.random = [username, username2, username3];
      // ctrl.random = [username, username2, username3, username4];


      console.log('This is the random array : ', ctrl.random);
    }).catch(function(err) {
      console.log('error getting response from the home :', err);
    });
  }; // end getCohorts function

  ctrl.getUsers();

  ctrl.profilePage = function() {
    $location.path('/profile');
  }

  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }



}); // end CohortsController
