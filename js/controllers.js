var app = angular.module('starter.controllers', []);


app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  



  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
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


app.controller('PostCtrl', ['$scope', 'PostFactory', function ($scope, PostFactory) {




    $scope.newPost = function () {
      
        console.log($scope.name);

        //var post = new PostFactory.create($scope.postData);
        //post.$save();

        console.log("WER");

        /*PostFactory.create($scope.name).success(function (data) {
            alert("SUCCESS");
        });*/


     }

}])

app.controller('PostCtrl', ['$scope', function ($scope) {


    $scope.newPost = function () {

        console.log($scope.name);

    }

}])


// Parse id and rest api key
app.value('PARSE_CREDENTIALS', {
    APP_ID: '8lI28e5lGH37hrHAcbLDVuLM9xXPWTrHCPG4rY8L',
    REST_API_KEY: 'JyA0uBxQrL4SLqZ6tdIT4CKY1og7PW7ryCquxy8m'
})


app.factory('PostFactory', ['$http', 'PARSE_CREDENTIALS', function ($http, PARSE_CREDENTIALS) {


    return {

        // CRUD operations, access Parse database 
        create: function (data) {
            return $http.get('https://api.parse.com/1/tutorials/links', data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        },

        read: function (id) {
            return $http.get('https://api.parse.com/1/tutorials/links/' + id, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },

        readAll: function () {
            return $http.get('https://api.parse.com/1/tutorials/links', {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },

        update: function (id, data) {
            return $http.put('https://api.parse.com/1/tutorials/links' + id, data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            });

        },

        delete: function (id) {
            return $http.delete('https://api.parse.com/1/tutorials/links' + id, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        }
    }

}])











app.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
      { title: 'How to Cook', points: 10 },
      { title: 'Another Tutorial', points: 2 },
      { title: 'Tutorials on Tutorials', points: 3 },
      { title: 'Have you wanted to learn about', points: 4 },
      { title: 'Learn to rap', points: 5 },
      { title: 'How to not make an app', points: 6 }
    ];
})

app.controller('PlaylistCtrl', function($scope, $stateParams) {



})

