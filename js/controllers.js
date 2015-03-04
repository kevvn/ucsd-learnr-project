var app = angular.module('starter.controllers', []);
// Parse id and rest api key
app.value('PARSE_CREDENTIALS', {
  APP_ID: 'qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH',
  REST_API_KEY: 'QOnuKyBBU5eWfugZLIDHEoFMzMf6N8mmrZyqc6tR',
  //SESSION_TOKEN: 'pnktnjyb996sj4p156gjtp4im'
})

app.controller('AppCtrl', ['$scope', '$rootScope', 'Users', '$state', '$ionicModal',
  function($scope, $rootScope, Users, $state, $ionicModal) {

    //  var currentUser = $scope.username;
    //  var currentPass = $scope.password;

    var currentUser = Parse.User.current();
    //  console.log(currentUser.id);
    //var userObject = currentUser.id;
    console.log($scope);
    if (currentUser) {
      var userObject = currentUser.id;
      $scope.logged = true;
      $scope.notlogged = true;
      Parse.User.become(currentUser._sessionToken).then(function(user) {
        $scope.currentLoggedin = currentUser;

      }, function(error) {
        // The token could not be validated.
        alert("Could not validate Token");
      });
    } else {

      console.log("NO USErS");

      // bring up login page
      //$state.go('app.login');

    }






    // Modal 1
    $ionicModal.fromTemplateUrl('templates/signup.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/login.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };

    /* Listen for broadcasted messages */

    $scope.$on('modal.shown', function(event, modal) {
      //console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
      //console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
  //    console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });




    $scope.doSignup = function(username, password) {

      woopra.track("sign_up_b", {
      });

      console.log(username);
      var name = username;
      var pass = password;

      var user = new Parse.User();
      user.set("username", username);
      user.set("password", password);


      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          // Lets them log in
          var currentUser = Parse.User.current();
          Parse.User.logIn(username, password, {
            success: function(user) {
              console.log("SUCCESS");


              $state.go('app.playlists');
              console.log($state);

              window.location.reload();
              //  $state.go('app.playlists');
            },
            error: function(user, error) {
              if (error.code) {
                alert(error.message);

              }
              console.log(error);
            }
          });

          //$state.go('app.playlists');

        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }




    $scope.doLogin = function(username, password) {


      console.log("BOOOOOM");



      Parse.User.logIn(username, password, {
        success: function(user) {
          console.log("SUCCESS");
          $scope.closeModal();
          $scope.logged = true;
          $scope.notlogged = true;
          $state.go('app.playlists');
          window.location.reload();
          //  $state.go('app.playlists');
        },
        error: function(user, error) {
          if (error.code) {
            alert(error.message);

          }
          console.log(error);
        }
      });



    }



    $scope.post = function() {

      woopra.track("post_ver_b", {
      });

      // Form data for the login modal
      var currentUser = Parse.User.current();
      //console.log(currentUser.id);
      //var userObject = currentUser.id;
      if (currentUser) {
        var userObject = currentUser.id;

        Parse.User.become(currentUser._sessionToken).then(function(user) {
          $scope.currentLoggedin = currentUser;

        }, function(error) {
          // The token could not be validated.
          alert("Could not validate Token");
        });


        $state.go('app.post');

        //  console.log(currentUser.attributes.username);
        //    console.log($scope);
      } else {

        console.log("NO USErS");

        // bring up login page
        $state.go('app.login');

      }

    }


    $scope.logout = function() {
      Parse.User.logOut();
      $scope.logged = false;
      $scope.notlogged = false;
      $state.go('app.playlists');
      window.location.reload();
      var currentUser = Parse.User.current();
      //   window.location.reload();
      console.log("LOGGED OUT");

    }

  }
])


app.controller('PostCtrl', ['$scope', 'PostFactory', '$state', function($scope, PostFactory, $state) {


  $scope.newPost = function() {

    console.log($scope.name);
    var currentUser = Parse.User.current();

    PostFactory.create({
      name: $scope.name,
      url: $scope.url,
      points: 0,
      content: $scope.content,
      tags: $scope.tags,
      tags2: $scope.tags2,
      createdBy: currentUser.id
    }).success(function(data) {
      console.log("GOOD");
      alert("Post successful");
      $state.go('app.playlists');
      window.location.reload();

    })

    console.log("SAVED!");

  }

}])






app.factory('PostFactory', ['$http', 'PARSE_CREDENTIALS', function($http, PARSE_CREDENTIALS) {

  return {

    // CRUD operations, access Parse database
    create: function(data) {

      return $http.post('https://api.parse.com/1/classes/PostFactory', data, {
        headers: {
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
          'Content-Type': 'application/json'
        }
      });
    },

    get: function(id) {
      return $http.get('https://api.parse.com/1/classes/PostFactory/' + id, {
        headers: {
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
        }
      });
    },

    getAll: function() {
      return $http.get('https://api.parse.com/1/classes/PostFactory', {
        headers: {
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
        }
      });
    },

    update: function(id, data) {
      return $http.put('https://api.parse.com/1/classes/PostFactory/' + id, data, {
        headers: {
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
          'Content-Type': 'application/json'
        }
      });

    },

    delete: function(id) {
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

/*
app.controller('UserCtrl', ['$scope', 'Users', '$state', function($scope, Users, $state, $ionic) {



  $scope.doSignup = function() {

    console.log($scope.username);
    var name = $scope.username;
    var pass = $scope.password;

    var user = new Parse.User();
    user.set("username", $scope.username);
    user.set("password", $scope.password);


    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        // Lets them log in
        var currentUser = Parse.User.current();
        Parse.User.logIn(name, pass, {
          success: function(user) {
            console.log("SUCCESS");


            $state.go('app.playlists');
            console.log($state);

            window.location.reload();
            //  $state.go('app.playlists');
          },
          error: function(user, error) {
            if (error.code) {
              alert(error.message);

            }
            console.log(error);
          }
        });

        //$state.go('app.playlists');

      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });

  }


}])

*/

/* Log in stuff?  */
app.factory('Users', ['$http', 'PARSE_CREDENTIALS', function($http, PARSE_CREDENTIALS) {

  return {

    // CRUD operations, access Parse database

    get: function(id) {
      return $http.get('https://api.parse.com/1/classes/favorite/' + id, {
        headers: {
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
        }
      });
    },
    update: function(id, data) {
      return $http.put('https://api.parse.com/1/classes/favorite' + id, data, {
        headers: {
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
          'Content-Type': 'application/json'
        }
      });

    },



  }

}])




app.controller('PlaylistsCtrl', ['$scope', 'PostFactory', function($scope, PostFactory, $state) {

  $scope.playlists = [];
  $scope.$watch("orderProp", function(newValue, oldValue) {
    if ($scope.orderProp) {

    } else {
      $scope.orderProp = '-points';
    }
  });
  PostFactory.getAll().success(function(data) {


    console.log(data.results.length);

    // push data into playlists array
    for (var i = 0; i < data.results.length; i++) {

      //console.log("GHGH");

      $scope.playlists.push({
        objectId: data.results[i].objectId,
        title: data.results[i].name,
        points: data.results[i].points,
        tags: data.results[i].tags,
        tags2: data.results[i].tags2
      });

    }
    console.log($scope);
    //    console.log(playlists.tags);
  })



  $scope.reloadPage = function() {
    window.location.reload();
  }




}])


app.controller('PlaylistCtrl', ['$scope', 'PostFactory', 'Users', '$stateParams',
  function($scope, PostFactory, Users, $state) {

    console.log($scope);

    PostFactory.get($state.playlistId).success(function(data) {


      $scope.title = data.name;
      $scope.content = data.content;
      $scope.points = data.points;
      $scope.url = data.url;

    })

    $scope.favorite = function() {
      if ($scope.currentLoggedin) {
        woopra.track("favorite_ver_b", { logged: "logged"
        });
        console.log($scope.currentLoggedin.id);

        var favorite = Parse.Object.extend("favorite");
        var privateNote = new favorite();
        privateNote.set("favorite", $state.playlistId);
        privateNote.set("content", $scope.currentLoggedin.id);
        privateNote.save();

      } else {
        woopra.track("post_ver_b", {logged: "notlogged"
        });
        alert("Please log in to favorite articles");
      }

    }
    $scope.upvote = function() {
      if ($scope.currentLoggedin) {

        // haven't upvoted before

        PostFactory.update($state.playlistId, {
          points: $scope.points + 1
        }).success(function(data) {
          console.log(data);

        })


        // upvoted before




      } else {

        alert("Please log in to favorite articles");
      }
    }
    $scope.report = function() {
      if ($scope.currentLoggedin) {
        alert("This article has been reported");
      } else {

        alert("Please log in to report articles");
      }
    }

  }
]);



app.controller('FavoriteCtrl', ['$rootScope', '$scope', 'PostFactory', 'Users', '$stateParams',
  function($rootScope, $scope, PostFactory, Users, $state) {

    var current = $state.userId;
    var object = [];
    var ids = [];
    var i = 0;
    $rootScope.favoriteId = [];

    var favorite = Parse.Object.extend("favorite");
    var query = new Parse.Query(favorite);

    query.equalTo("content", current);

    query.find({
      success: function(results) {
        //    console.log(results);

        // Do something with the returned Parse.Object values
        for (i = 0; i < results.length; i++) {

          object[i] = results[i];
          ids[i] = object[i].attributes.favorite;

        }
        while (i > 0) {
          i--;
          PostFactory.get(ids[i]).success(function(data) {

            $rootScope.favoriteId.push({
              objectId: data.objectId,
              title: data.name,
              points: data.points
            });
          })

        }

      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }



    });

    console.log($rootScope);


  }
]);

app.controller('MyPostCtrl', ['$rootScope', '$scope', 'PostFactory', '$stateParams',
  function($rootScope, $scope, PostFactory, $state) {

    var current = $state.userId;
    var object = [];
    var ids = [];
    var i = 0;
    $rootScope.posts = [];

    var posts = Parse.Object.extend("PostFactory");
    var query = new Parse.Query(posts);

    query.equalTo("createdBy", current);

    query.find({
      success: function(results) {
          console.log("results");
            console.log(results);

        // Do something with the returned Parse.Object values
        for (i = 0; i < results.length; i++) {

          //object[i] = results[i];
          ids[i] = results[i].id;
      //    console.log(ids[i]);
          PostFactory.get(results[i].id).success(function(data) {

            console.log("data");
            console.log(data);
            $rootScope.posts.push({
              objectId: data.objectId,
              title: data.name,
              points: data.points
            });
          })

        }


      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }



    });
    console.log("hi");
    console.log($rootScope);


  }
]);
