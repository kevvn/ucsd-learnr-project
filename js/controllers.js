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


app.controller('PostCtrl', ['$scope', 'PostFactory', '$state', function ($scope, PostFactory, $state) {

    $scope.newPost = function () {
      
        console.log($scope.name);

        PostFactory.create({ name: $scope.name, url: $scope.url, points: 0 }).success(function (data) {
            console.log("GOOD");

            $state.go('app.playlists');
        })

        console.log("SAVED!");

     }

}])



// Parse id and rest api key
app.value('PARSE_CREDENTIALS', {
    APP_ID: 'qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH',
    REST_API_KEY: 'QOnuKyBBU5eWfugZLIDHEoFMzMf6N8mmrZyqc6tR'
})


app.factory('PostFactory', ['$http', 'PARSE_CREDENTIALS', function ($http, PARSE_CREDENTIALS) {

    return {

        // CRUD operations, access Parse database 
        create: function (data) {

            return $http.post('https://api.parse.com/1/classes/PostFactory', data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        },

        get: function (id) {
            return $http.get('https://api.parse.com/1/classes/PostFactory/' + id, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },

        getAll: function () {
            return $http.get('https://api.parse.com/1/classes/PostFactory', {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },

        update: function (id, data) {
            return $http.put('https://api.parse.com/1/classes/PostFactory' + id, data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            });

        },

        delete: function (id) {
            return $http.delete('https://api.parse.com/1/classes/PostFactory' + id, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        }
    }

}])





app.controller('PlaylistsCtrl', ['$scope', 'PostFactory', function ($scope, PostFactory) {


    /*$scope.playlists = [
      { title: 'How to Cook', points: 10 },
      { title: 'Another Tutorial', points: 2 },
      { title: 'Tutorials on Tutorials', points: 3 },
      { title: 'Have you wanted to learn about', points: 4 },
      { title: 'Learn to rap', points: 5 },
      { title: 'How to not make an app', points: 6 }
    ];*/

    $scope.playlists = [];
    
    PostFactory.getAll().success(function (data) {

        console.log("QWERQERQWERQEWR");


        console.log(data.results.length);

        // push data into playlists array
        for (var i = 0; i < data.results.length; i++) {

            //console.log("GHGH");
            

            

            $scope.playlists.push({objectID: data.results[i].objectID, title: data.results[i].name, points: data.results[i].points});
            //console.log(data.results[i].name);
        }


    })

}])

app.controller('PlaylistCtrl', function($scope, $stateParams) {



})