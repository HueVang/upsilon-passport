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

  ctrl.getUsers = function() {
     $http.get('/home/usernames').then(function(response) {
      ctrl.usernames = response.data;

      console.log('This is the usernames data: ',response.data);

      // selects random name from the ctrl.usernames array and then removes it from the array.
      var random1 = Math.floor(Math.random()*ctrl.usernames.length);
      var username = ctrl.usernames.splice(random1, 1)[0].username;
      console.log('This is the usernames array : ', ctrl.usernames);
      var random2 = Math.floor(Math.random()*ctrl.usernames.length);
      var username2 = ctrl.usernames.splice(random2, 1)[0].username;
      console.log('This is the usernames array : ', ctrl.usernames);
      var random3 = Math.floor(Math.random()*ctrl.usernames.length);
      var username3 = ctrl.usernames.splice(random3, 1)[0].username;
      ctrl.random = [username, username2, username3];

      console.log('This is the random array : ', ctrl.random);
    }).catch(function(err) {
      console.log('error getting response from the home :', err);
    });
  }; // end getCohorts function

  ctrl.getUsers();
  // ctrl.showRandom = function() {
  //     var username = ctrl.usernames[Math.floor(Math.random()*list.length)].username;
  //     ctrl.random = [username, username, username];
  // };

window.setInterval(ctrl.getUsers, 3000);



});
