var app = angular.module('starter.controllers', []);
// Parse id and rest api key
app.value('PARSE_CREDENTIALS', {
    APP_ID: 'qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH',
    REST_API_KEY: 'QOnuKyBBU5eWfugZLIDHEoFMzMf6N8mmrZyqc6tR',
    SESSION_TOKEN: 'pnktnjyb996sj4p156gjtp4im'
})

app.controller('AppCtrl', ['$scope','$state', function ($scope, $state, $ionicModal) {
  // Form data for the login modal
  $scope.sessionUser = Parse.User.current();


}])


app.controller('PostCtrl', ['$scope', 'PostFactory', '$state', function ($scope, PostFactory, $state) {

    $scope.newPost = function () {

        console.log($scope.name);

        PostFactory.create({ name: $scope.name, url: $scope.url, points: 0, content: $scope.content, tags: $scope.tags, tags2: $scope.tags2}).success(function (data) {
            console.log("GOOD");

            $state.go('app.playlists');

        })

        console.log("SAVED!");

     }

}])






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
            return $http.put('https://api.parse.com/1/classes/PostFactory/' + id, data, {
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


app.controller('UserCtrl', ['$scope', 'Users', '$state', function ($scope, Users, $state) {



    $scope.doSignup = function () {

        console.log($scope.username);

        Users.signup({ "username": $scope.username, password: $scope.password}).success(function (data) {
          console.log(data);

            $state.go('app.playlists');

        })

        console.log("SAVED!");

     }


         $scope.doLogin = function () {

             console.log($scope.username);
             var currentUser = $scope.username;
             var currentPass = $scope.password;
             Users.login({ username: currentUser, password: currentPass}).success(function (data) {
                 console.log(data);

                 $state.go('app.playlists');

             })

             console.log("SAVED!");

          }

}])

/* Log in stuff?  */
app.factory('Users', ['$http', 'PARSE_CREDENTIALS', function ($http, PARSE_CREDENTIALS) {

    return {

        // CRUD operations, access Parse database
        signup: function (data) {

            return $http.post('https://api.parse.com/1/users', data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,

                    'Content-Type': 'application/json'
                }
            });
        },



        login: function ( data) {
            return $http.get('https://api.parse.com/1/login', data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,

                    'Content-Type': 'application/json'
                }
            });

        },


    }

}])




app.controller('PlaylistsCtrl', ['$scope', 'PostFactory', function ($scope, PostFactory, $state) {

    $scope.playlists = [];
    console.log($scope);
    PostFactory.getAll().success(function (data) {


        console.log(data.results.length);

        // push data into playlists array
        for (var i = 0; i < data.results.length; i++) {

            //console.log("GHGH");

            $scope.playlists.push({objectId: data.results[i].objectId, title: data.results[i].name, points: data.results[i].points,
                tags: data.results[i].tags,  tags2: data.results[i].tags2 });

        }
        //$scope.orderProp ='-points';

    //    console.log(playlists.tags);
    })



    $scope.reloadPage = function(){window.location.reload();}




}])
/*
app.controller('PlaylistCtrl', function($scope, $stateParams) {
  console.log($scope.playlistId);
  $scope.playlistId = $stateParams.playlistId;

});


*/

app.controller('PlaylistCtrl', ['$scope','PostFactory', '$stateParams',
  function($scope, PostFactory, $state) {

    console.log($scope);

    PostFactory.get($state.playlistId).success(function (data) {


      $scope.title = data.name;
      $scope.content = data.content;
      $scope.points = data.points;
      $scope.url = data.url;

    //    console.log(playlists.tags);
  })
  $scope.upvote = function () {

    PostFactory.update($state.playlistId ,{points: $scope.points+1}).success(function (data){
    console.log(data);

  })
}

  //UPVOTE


//  PostFactory.update($state.playlistId ,points).success(function (data) {

//  })
//  console.log($scope.$parent.playlistsContent);

}]);
