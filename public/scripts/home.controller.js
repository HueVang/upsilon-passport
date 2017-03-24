angular.module('soloApp').controller('HomeController', function($http, $location){

  var ctrl = this;
  ctrl.usernames = [];

  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }

  ctrl.profilePage = function() {
    $location.path('/profile');
  }

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

  ctrl.getUsers = function() {
     $http.get('/home/users').then(function(response) {
      ctrl.users = response.data;

      // console.log('This is the usernames data: ',response.data);

      // selects random name from the ctrl.usernames array and then removes it from the array.
      var random1 = Math.floor(Math.random()*ctrl.users.length);
      var user = ctrl.users.splice(random1, 1)[0];
      // console.log('This is the usernames array : ', ctrl.usernames);
      var random2 = Math.floor(Math.random()*ctrl.users.length);
      var user2 = ctrl.users.splice(random2, 1)[0];
      // console.log('This is the usernames array : ', ctrl.usernames);
      var random3 = Math.floor(Math.random()*ctrl.users.length);
      var user3 = ctrl.users.splice(random3, 1)[0];
      // console.log('This is the usernames array : ', ctrl.usernames);
      var random4 = Math.floor(Math.random()*ctrl.users.length);
      var user4 = ctrl.users.splice(random4, 1)[0];
      var random5 = Math.floor(Math.random()*ctrl.users.length);
      var user5 = ctrl.users.splice(random5, 1)[0];
      var random6 = Math.floor(Math.random()*ctrl.users.length);
      var user6 = ctrl.users.splice(random6, 1)[0];
      var random7 = Math.floor(Math.random()*ctrl.users.length);
      var user7 = ctrl.users.splice(random7, 1)[0];
      var random8 = Math.floor(Math.random()*ctrl.users.length);
      var user8 = ctrl.users.splice(random8, 1)[0];
      var random9 = Math.floor(Math.random()*ctrl.users.length);
      var user9 = ctrl.users.splice(random9, 1)[0];
      var random10 = Math.floor(Math.random()*ctrl.users.length);
      var user10 = ctrl.users.splice(random10, 1)[0];
      var random11 = Math.floor(Math.random()*ctrl.users.length);
      var user11 = ctrl.users.splice(random11, 1)[0];
      var random12 = Math.floor(Math.random()*ctrl.users.length);
      var user12 = ctrl.users.splice(random12, 1)[0];
      ctrl.random = [user, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12];
      // ctrl.random = [username, username2, username3, username4];


      console.log('This is the random array : ', ctrl.random);
    }).catch(function(err) {
      console.log('error getting response from the home :', err);
    });
  }; // end getCohorts function

  ctrl.getUsers();

  // ctrl.getUsers = function() {
  //    $http.get('/home/usernames').then(function(response) {
  //     ctrl.usernames = response.data;
  //
  //     // console.log('This is the usernames data: ',response.data);
  //
  //     // selects random name from the ctrl.usernames array and then removes it from the array.
  //     var random1 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username = ctrl.usernames.splice(random1, 1)[0].username;
  //     // console.log('This is the usernames array : ', ctrl.usernames);
  //     var random2 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username2 = ctrl.usernames.splice(random2, 1)[0].username;
  //     // console.log('This is the usernames array : ', ctrl.usernames);
  //     var random3 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username3 = ctrl.usernames.splice(random3, 1)[0].username;
  //     // console.log('This is the usernames array : ', ctrl.usernames);
  //     var random4 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username4 = ctrl.usernames.splice(random4, 1)[0].username;
  //     var random5 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username5 = ctrl.usernames.splice(random5, 1)[0].username;
  //     var random6 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username6 = ctrl.usernames.splice(random6, 1)[0].username;
  //     var random7 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username7 = ctrl.usernames.splice(random7, 1)[0].username;
  //     var random8 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username8 = ctrl.usernames.splice(random8, 1)[0].username;
  //     var random9 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username9 = ctrl.usernames.splice(random9, 1)[0].username;
  //     var random10 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username10 = ctrl.usernames.splice(random10, 1)[0].username;
  //     var random11 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username11 = ctrl.usernames.splice(random11, 1)[0].username;
  //     var random12 = Math.floor(Math.random()*ctrl.usernames.length);
  //     var username12 = ctrl.usernames.splice(random12, 1)[0].username;
  //     ctrl.random = [username, username2, username3, username4, username5, username6, username7, username8, username9, username10, username11, username12];
  //     // ctrl.random = [username, username2, username3, username4];
  //
  //
  //     console.log('This is the random array : ', ctrl.random);
  //   }).catch(function(err) {
  //     console.log('error getting response from the home :', err);
  //   });
  // }; // end getCohorts function
  //
  // ctrl.getUsers();



  // ctrl.showRandom = function() {
  //     var username = ctrl.usernames[Math.floor(Math.random()*list.length)].username;
  //     ctrl.random = [username, username, username];
  // };

// window.setInterval(ctrl.getUsers, 10000);


});
