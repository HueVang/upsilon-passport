angular.module('soloApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {
  console.log('LoginController loaded');
  var ctrl = this;

  ctrl.getUsers = function() {
     $http.get('/login/users').then(function(response) {
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

}
