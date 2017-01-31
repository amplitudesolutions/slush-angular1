'use strict';

angular.module('<%=appName%>.services.<%=serviceLCase%>', [])

.factory('<%=serviceLCase%>', function($http, API_URL){
    return {
        get: function() {
            return $http.get(API_URL + '/<%=serviceLCase%>').then(function(response) {
        		return response.data;
        	});
        },
        getById: function(id) {
            return $http.get(API_URL + '/<%=serviceLCase%>/' + id).then(function(response) {
        		return response.data;
        	});  
        },
        add: function(<%=serviceSingle%>) {
        	return $http.post(API_URL + '/<%=serviceLCase%>', <%=serviceSingle%>).then(function(response) {
        		return response.data;
        	});
        },
        save: function(<%=serviceSingle%>) {
			return $http.put(API_URL + '/<%=serviceLCase%>/' + <%=serviceSingle%>._id, <%=serviceSingle%>).then(function(response) {
        		return response.data;
        	});
        },
        remove: function(id) {
            return $http.delete(API_URL + '/<%=serviceLCase%>/' + id).then(function(response) {
                return response.data;
            });
        }
    };
})

;