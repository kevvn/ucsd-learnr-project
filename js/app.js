// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
      Parse.initialize("qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH", "NCteUlF8BFnxNniGAi6JqxbxxL5hKcUXlR4uECnn");
      //Parse.initialize("8lI28e5lGH37hrHAcbLDVuLM9xXPWTrHCPG4rY8L", "JyA0uBxQrL4SLqZ6tdIT4CKY1og7PW7ryCquxy8m");

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)



(function(){
        var t,i,e,n=window,o=document,a=arguments,s="script",r=["config","track","identify","visit","push","call","trackForm","trackClick"],c=function(){var t,i=this;for(i._e=[],t=0;r.length>t;t++)(function(t){i[t]=function(){return i._e.push([t].concat(Array.prototype.slice.call(arguments,0))),i}})(r[t])};for(n._w=n._w||{},t=0;a.length>t;t++)n._w[a[t]]=n[a[t]]=n[a[t]]||new c;i=o.createElement(s),i.async=1,i.src="//static.woopra.com/js/w.js",e=o.getElementsByTagName(s)[0],e.parentNode.insertBefore(i,e)
})("woopra");

woopra.config({
    domain: 'learnrhelpr.herokuapp.com'
});
woopra.track();




    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider



  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.help', {
    url: "/help",
    views: {
      'menuContent': {
        templateUrl: "templates/help.html"
      }
    }
  })

  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html"
      }
    }
  })



  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })
  .state('app.post', {
    url: "/post",
    views: {
      'menuContent': {
        templateUrl: "templates/post.html",
		controller: 'PostCtrl'
      }
    }
  })

  .state('app.404', {
    url: "/404",
    views: {
      'menuContent': {
        templateUrl: "templates/404.html"
      }
    }
  })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.playlist', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html" //,
      //  controller: 'PlaylistCtrl'
      }
    }

    })

  .state('app.favorites', {
    url: "/favorites/:userId",
    views: {
      'menuContent': {
        templateUrl: "templates/favorites.html",
        controller: 'FavoriteCtrl'
      }
    }
  })

  .state('app.mypost', {
    url: "/mypost/:userId",
    views: {
      'menuContent': {
        templateUrl: "templates/mypost.html",
        controller: 'MyPostCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
