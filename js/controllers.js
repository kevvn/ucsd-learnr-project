var app = angular.module('starter.controllers', []);
// Parse id and rest api key
app.value('PARSE_CREDENTIALS', {
  APP_ID: 'qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH',
  REST_API_KEY: 'QOnuKyBBU5eWfugZLIDHEoFMzMf6N8mmrZyqc6tR',
  SESSION_TOKEN: 'pnktnjyb996sj4p156gjtp4im'
})

<<<<<<< Updated upstream
app.controller('AppCtrl', ['$scope', '$rootScope', 'Users', '$state', '$ionicModal',
    function ($scope, $rootScope, Users, $state, $ionicModal) {

=======
app.controller('AppCtrl', ['$scope', 'Users', '$state', function($scope, Users, $state, $ionicModal) {
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

    //  console.log(currentUser.attributes.username);
    //    console.log($scope);
  } else {
>>>>>>> Stashed changes


        // login popup 
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal
        });
        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });


<<<<<<< Updated upstream
        
=======
  $scope.logout = function() {
    Parse.User.logOut();
    $scope.reloadPage = function() {
      window.location.reload()
    };
    var currentUser = Parse.User.current();
  }
>>>>>>> Stashed changes

        $scope.doLogin = function () {


            console.log("BOOOOOM");


            console.log($scope);
            console.log($rootScope);
            var currentUser = $rootScope.username;
            var currentPass = $rootScope.password;

            console.log(currentUser);
            console.log(currentPass);

            Parse.User.logIn($scope.username, $scope.password, {
                success: function (user) {

                    $state.go('app.playlists');
                },
                error: function (user, error) {
                    if (error.code == 101) {
                        alert(error.message);

                    }
                    console.log(error);
                }
            });



        }

        /*$scope.login = function() {
    
    
            console.log("LOGIN POPUP!!!!");
    
            var loginPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="username"> <input type="password" ng-model="password">',
                title: 'Login or Signup',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: 'Login',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.username) {
    
                                e.preventDefault();
                            } else {
                                return $scope.username;
                            }
                        }
                    }
    
                ]
    
            });
            loginPopup.then(function (res) {
                console.log('Tapped', res);
            });
          
        };*/



        $scope.post = function () {


            // Form data for the login modal
            var currentUser = Parse.User.current();
            //console.log(currentUser.id);
            //var userObject = currentUser.id;
            if (currentUser) {
                var userObject = currentUser.id;

                Parse.User.become(currentUser._sessionToken).then(function (user) {
                    $scope.currentLoggedin = currentUser;

                }, function (error) {
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


        $scope.logout = function () {
            Parse.User.logOut();
            $scope.reloadPage = function () { window.location.reload() };
            var currentUser = Parse.User.current();

            console.log("LOGGED OUT");

        }

    }])


app.controller('PostCtrl', ['$scope', 'PostFactory', '$state', function($scope, PostFactory, $state) {

  $scope.newPost = function() {

    console.log($scope.name);

<<<<<<< Updated upstream
        PostFactory.create({ name: $scope.name, url: $scope.url, points: 0, content: $scope.content, tags: $scope.tags, tags2: $scope.tags2 }).success(function (data) {
            console.log("GOOD");
            alert("Post successful");
            $state.go('app.playlists');
=======
    PostFactory.create({
      name: $scope.name,
      url: $scope.url,
      points: 0,
      content: $scope.content,
      tags: $scope.tags,
      tags2: $scope.tags2,
      Increment: 0
    }).success(function(data) {
      console.log("GOOD");
      alert("Post successful");
      $state.go('app.playlists');
>>>>>>> Stashed changes

    })

    console.log("SAVED!");

<<<<<<< Updated upstream
    }
=======
  }
>>>>>>> Stashed changes

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


app.controller('UserCtrl', ['$scope', 'Users', '$state', function($scope, Users, $state, $ionic) {



  $scope.doSignup = function() {

    console.log($scope.username);

<<<<<<< Updated upstream
        var user = new Parse.User();
        user.set("username", $scope.username);
        user.set("password", $scope.password);


        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.

                $state.go('app.playlists');

            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });

    }

=======
    var user = new Parse.User();
    user.set("username", $scope.username);
    user.set("password", $scope.password);


    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.

        $state.go('app.playlists');

      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });

  }
>>>>>>> Stashed changes

    /*console.log("WASSABBIBII");


    $scope.doLogin = function () {


<<<<<<< Updated upstream
        console.log("BOOOOOM");

        console.log($scope.username);
        var currentUser = $scope.username;
        var currentPass = $scope.password;

        Parse.User.logIn($scope.username, $scope.password, {
            success: function (user) {

                $state.go('app.playlists');
            },
            error: function (user, error) {
                if (error.code == 101) {
                    alert(error.message);

                }
                console.log(error);
            }
        });



    }*/
=======
  $scope.doLogin = function() {

    console.log($scope.username);
    var currentUser = $scope.username;
    var currentPass = $scope.password;

    Parse.User.logIn($scope.username, $scope.password, {
      success: function(user) {

        $state.go('app.playlists');
      },
      error: function(user, error) {
        if (error.code == 101) {
          alert(error.message);

        }
        console.log(error);
      }
    });



  }
>>>>>>> Stashed changes

}])

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
    delete: function(id) {
      return $http.delete('https://api.parse.com/1/classes/favorite/' + id, {
        headers: {
          'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
          'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
          'Content-Type': 'application/json'
        }
      });
    }



  }

}])




app.controller('PlaylistsCtrl', ['$scope', 'PostFactory', function($scope, PostFactory, $state) {

<<<<<<< Updated upstream
    $scope.playlists = [];
    $scope.$watch("orderProp", function (newValue, oldValue) {
        if ($scope.orderProp) {

        }
        else {
            $scope.orderProp = '-points';
        }
    });
    PostFactory.getAll().success(function (data) {
=======
  $scope.playlists = [];
  $scope.$watch("orderProp", function(newValue, oldValue) {
    if ($scope.orderProp) {

    } else {
      $scope.orderProp = '-points';
    }
  });
  PostFactory.getAll().success(function(data) {
>>>>>>> Stashed changes


    console.log(data.results.length);

    // push data into playlists array
    for (var i = 0; i < data.results.length; i++) {

      //console.log("GHGH");

<<<<<<< Updated upstream
            $scope.playlists.push({
                objectId: data.results[i].objectId, title: data.results[i].name, points: data.results[i].points,
                tags: data.results[i].tags, tags2: data.results[i].tags2
            });

        }
        console.log($scope);
        //    console.log(playlists.tags);
    })



    $scope.reloadPage = function () { window.location.reload(); }
=======
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
>>>>>>> Stashed changes




}])


app.controller('PlaylistCtrl', ['$scope', 'PostFactory', 'Users', '$stateParams',
<<<<<<< Updated upstream
  function ($scope, PostFactory, Users, $state) {
=======
  function($scope, PostFactory, Users, $state) {
>>>>>>> Stashed changes

      console.log($scope);

<<<<<<< Updated upstream
      PostFactory.get($state.playlistId).success(function (data) {
=======
    PostFactory.get($state.playlistId).success(function(data) {
>>>>>>> Stashed changes


          $scope.title = data.name;
          $scope.content = data.content;
          $scope.points = data.points;
          $scope.url = data.url;

<<<<<<< Updated upstream
      })

      $scope.favorite = function () {
          if ($scope.currentLoggedin) {
              console.log($scope.currentLoggedin.id);

              var favorite = Parse.Object.extend("favorite");
              var privateNote = new favorite();
              privateNote.set("favorite", $state.playlistId);
              privateNote.set("content", $scope.currentLoggedin.id);
              privateNote.save();

          }
          else {

              alert("Please log in to favorite articles");
          }

      }
      $scope.upvote = function () {
          if ($scope.currentLoggedin) {

              // haven't upvoted before

              PostFactory.update($state.playlistId, { points: $scope.points + 1 }).success(function (data) {
                  console.log(data);

              })


              // upvoted before




          }
          else {

              alert("Please log in to favorite articles");
          }
      }
      $scope.report = function () {
          if ($scope.currentLoggedin) {
              alert("This article has been reported");
          }
          else {
=======
    })

    $scope.favorite = function() {
      if ($scope.currentLoggedin) {
        console.log($scope.currentLoggedin.id);

        var favorite = Parse.Object.extend("favorite");
        var privateNote = new favorite();
        privateNote.set("favorite", $state.playlistId);
        privateNote.set("content", $scope.currentLoggedin.id);
        privateNote.save();

      } else {

        alert("Please log in to favorite articles");
      }

    }
    $scope.upvote = function() {
      if ($scope.currentLoggedin) {
        PostFactory.update($state.playlistId, {
          points: $scope.points + 1
        }).success(function(data) {
          console.log(data);

        })
      } else {

        alert("Please log in to favorite articles");
      }
    }
    $scope.report = function() {
      if ($scope.currentLoggedin) {
        alert("This article has been reported");
      } else {
>>>>>>> Stashed changes

              alert("Please log in to report articles");
          }
      }

<<<<<<< Updated upstream
  }]);
=======
  }
]);
>>>>>>> Stashed changes



app.controller('FavoriteCtrl', ['$rootScope', '$scope', 'PostFactory', 'Users', '$stateParams',
<<<<<<< Updated upstream
  function ($rootScope, $scope, PostFactory, Users, $state) {

      var current = $state.userId;
      var object = [];
      var ids = [];
      var i = 0;
      $rootScope.favoriteId = [];
=======
  function($rootScope, $scope, PostFactory, Users, $state) {
    $scope.listCanSwipe = true;

    var current = $state.userId;
    var object = [];
    var ids = [];
    var userSpec = [];
    var i = 0;
    $rootScope.favoriteId = [];
>>>>>>> Stashed changes

      var favorite = Parse.Object.extend("favorite");
      var query = new Parse.Query(favorite);

      query.equalTo("content", current);

<<<<<<< Updated upstream
      query.find({
          success: function (results) {
              //    console.log(results);

              // Do something with the returned Parse.Object values
              for (i = 0; i < results.length; i++) {

                  object[i] = results[i];
                  ids[i] = object[i].attributes.favorite;

              }
              while (i > 0) {
                  i--;
                  PostFactory.get(ids[i]).success(function (data) {

                      $rootScope.favoriteId.push({ objectId: data.objectId, title: data.name, points: data.points });
                  })

              }

          },
          error: function (error) {
              alert("Error: " + error.code + " " + error.message);
          }
=======
    query.find({
      success: function(results) {
        //    console.log(results);

        // Do something with the returned Parse.Object values
        for (i = 0; i < results.length; i++) {

          object[i] = results[i];
          ids[i] = object[i].attributes.favorite;
          userSpec[i] = object[i].id;

          PostFactory.get(ids[i]).success(function(data) {

            $rootScope.favoriteId.push({
              id: 0,
              objectId: data.objectId,
              title: data.name,
              points: data.points,
            });

          })

          var b = angular.toJson($rootScope.favoriteId,true);
          console.log(b);

        //  $rootScope.favoriteId.Id = ids[i].id;
        //  $scope.save();


        }
    /*    while (i > 0) {
          i--;
          PostFactory.get(ids[i]).success(function(data) {

            $rootScope.favoriteId.push({
              Id: ids.objectId,
              objectId: data.objectId,
              title: data.name,
              points: data.points
            });
          })

        } */


      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }

>>>>>>> Stashed changes


    });
    console.log($rootScope);

    $scope.trash = function(thing){
      console.log(thing);
      Users.delete(thing).success(function (data){

<<<<<<< Updated upstream
      });

      console.log($rootScope);


  }]);
=======

        console.log(data);
      })

    }



    console.log($scope);


  }
]);
>>>>>>> Stashed changes
