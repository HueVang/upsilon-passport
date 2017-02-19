angular.module('soloApp').controller('ProfileControllerTest', ['$scope', '$route' , function($http, $location, $scope, $route) {
  console.log('ProfileControllerTest loaded');

  $scope.user_info = [{"firstname" : "",
  "lastname" : "",
  "image" : "",
  "personalsummary" : "",
  "cohort" : "",
  "title" : "",
  "user_location" : "",
  "facts" : ""
}];

  console.log('This is user info object: ', $scope.user_info);



  $scope.getCohorts = function() {
     $http.get('/profile/cohorts').then(function(response) {
      $scope.cohorts = response.data;
      console.log('This is the cohorts data: ',response.data);
    }).catch(function(err) {
      console.log('error getting response from the cohorts :', err);
    });
  }; // end getCohorts function

  $scope.getCohorts();

  $scope.getUserInfo = function() {
    $http.get('/profile/userinfo').then(function(response) {
      $scope.user_info = response.data;
      console.log('This is the user info: ', response.data);
      console.log('This is $scope.user_info:', $scope.user_info);
    }).catch(function(err) {
      console.log('error getting response from the user :', err);
    });
  }; // end getUserInfo function

  $scope.getUserInfo();

  $scope.test = function() {
    $http.get('/profile/image').then(function(response) {
      $scope.image = response.data;
      $scope.user_info[0].image = $scope.image[0].image;
      console.log('This is the $scope.image'), $scope.image;
      console.log('This is $scope.user_info[0]', $scope.user_info[0].image);
      $location.path('/profile-edit');
      $route.reload();
    }).catch(function(err) {
      console.log('error getting response from the db :', err);
    });
    console.log('This works!');
  };

  $scope.edit = function() {
    $location.path('/profile-edit');
  }; //end edit function

  $scope.cancel = function() {
    $location.path('/profile');
  }; // end cancel function


  $scope.saveChanges = function(userInfo) {
    console.log('This is the user\'s info: ', userInfo);
    return $http.post('/profile/post', userInfo).then(function(response) {
      $location.path('/profile');
      // return response;
    }).catch(function(err) {
      console.log('error getting response from profile.js: ', err);
    });
  }; // end saveChanges function

  $scope.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }

}]); // end ProfileController
