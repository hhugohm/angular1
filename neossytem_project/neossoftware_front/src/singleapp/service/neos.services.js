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
								console.log("data alta" +data);
		            return $http.post(url,data,config);
		        }; 

service.updateUser=function (dataUser) {
	console.log("FORM : "+ dataUser);
					var data = angular.toJson(dataUser);
					console.log("JSON : "+dataUser.iduser);
					
					var url = apiURL + '/user/'+dataUser.iduser;
					console.log('URL: ' + url);
                    var config = {
                                headers : {
                                             'Content-Type': 'application/json'
                                         }
                                }
		            return $http.put(url,data,config);
		        }; 

service.deleUser=function (idUser) {
		            var url = apiURL + '/user/'+idUser ;
		            return $http.delete(url);
		        }; 
                
service.getAllUser=function () {
		            var url = apiURL + '/user';
		            return $http.get(url);
		        };    
service.getUser=function (idUser) {
		            var url = apiURL + '/user/'+idUser ;
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
