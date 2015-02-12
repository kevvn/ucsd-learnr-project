angular.module('ionicApp', ['ionic', 'ngResource'])

.factory('Post', function($resource) {
  return $resource('/api/post/:id');
})

.controller('MainCtrl', function($scope, Post) {
  // Get all posts
  $scope.posts = Post.query();

  // Our form data for creating a new post with ng-model
  $scope.postData = {};
  $scope.newPost = function() {
    var post = new Post($scope.postData);
    post.$save();
  }
});


/*angular.module('starter.services', []).factory('PostFactory', ['$http', '$PARSE_CREDENTIALS', function ($http, PARSE_CREDENTIALS) {


    alert("YTYTYTY");


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


// Parse id and rest api key
.value('PARSE_CREDENTIALS', {
    APP_ID: '8lI28e5lGH37hrHAcbLDVuLM9xXPWTrHCPG4rY8L',
    REST_API_KEY: 'JyA0uBxQrL4SLqZ6tdIT4CKY1og7PW7ryCquxy8m'
})*/
