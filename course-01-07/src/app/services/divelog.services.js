(function(){
'use strict';

angular.module('diveLog').factory('divelogApi',function(apiURL,$http){

  var service = {
		    getDives: function () {
		      var url = apiURL
		        + '/api/backendtest/dives';
		      return $http.get(url);

		    }
	    };
	 return service;

});

})();
