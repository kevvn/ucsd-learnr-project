angular.module('todoApp.services',[]).factory('Article',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
    return {
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/Article',{
                headers:{
                    'X-Parse-Application-Id': qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH,
                    'X-Parse-REST-API-Key':QOnuKyBBU5eWfugZLIDHEoFMzMf6N8mmrZyqc6tR,
                }
            });
        },
        get:function(id){
            return $http.get('https://api.parse.com/1/classes/Article/'+id,{
                headers:{
                    'X-Parse-Application-Id': qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH,
                    'X-Parse-REST-API-Key':QOnuKyBBU5eWfugZLIDHEoFMzMf6N8mmrZyqc6tR,
                }
            });
        },
        create:function(data){
            return $http.post('https://api.parse.com/1/classes/Article',data,{
                headers:{
                    'X-Parse-Application-Id': qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH,
                    'X-Parse-REST-API-Key':QOnuKyBBU5eWfugZLIDHEoFMzMf6N8mmrZyqc6tR,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/Article/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH,
                    'X-Parse-REST-API-Key':QOnuKyBBU5eWfugZLIDHEoFMzMf6N8mmrZyqc6tR,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/Article/'+id,{
                headers:{
                    'X-Parse-Application-Id': qCKMCAPQBXhmMghKpKjkkNGhejWQ5w7Sm2NpYmnH,
                    'X-Parse-REST-API-Key':QOnuKyBBU5eWfugZLIDHEoFMzMf6N8mmrZyqc6tR,
                    'Content-Type':'application/json'
                }
            });
        }
    }
}]);