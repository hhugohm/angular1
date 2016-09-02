(function(){
'use strict';

angular.module('neosApplication').factory('userApi',function(apiURL,$http){

var service={};


service.createUser=function (dataUser) {
		            var url = apiURL + '/user';
                    var data = angular.toJson(dataUser);
                    var config = {
                                headers : {
                                             'Content-Type': 'application/json'
                                         }
                                }
		            return $http.post(url,data,config);
		        }; 

service.deleUser=function (idUser) {
		            var url = apiURL + '/user/'+idUser ;
		            return $http.delete(url);
		        }; 
                
service.getUser=function () {
		            var url = apiURL + '/user';
		            return $http.get(url);
		        };            
            

  /*var service = {
		    getUser: function () {
		      var url = apiURL + '/user';
		      return $http.get(url);
		    }

	    };*/



return service;


});

})();
