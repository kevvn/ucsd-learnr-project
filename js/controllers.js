angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  

  Parse.initialize("qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH", "NCteUlF8BFnxNniGAi6JqxbxxL5hKcUXlR4uECnn");


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  var user = new Parse.User();
  user.set("username", "my name");
  user.set("password", "my pass");
    
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
	
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
 
  
})





.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'How to Cook', points: 10 },
    { title: 'Another Tutorial', points: 2 },
    { title: 'Tutorials on Tutorials', points: 3 },
    { title: 'Have you wanted to learn about', points: 4 },
    { title: 'Learn to rap', points: 5 },
    { title: 'How to not make an app', points: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

