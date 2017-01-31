'use strict';

angular.module('itdocs.services.clients', [])

.factory('clients', function($http, API_URL){
    return {
        get: function() {
            return $http.get(API_URL + '/clients').then(function(response) {
        		return response.data;
        	});
        },
        getById: function(id) {
            return $http.get(API_URL + '/clients/' + id).then(function(response) {
        		return response.data;
        	});  
        },
        add: function(client) {
        	return $http.post(API_URL + '/clients', client).then(function(response) {
        		return response.data;
        	});
        },
        save: function(client) {
			return $http.put(API_URL + '/clients/' + client._id, client).then(function(response) {
        		return response.data;
        	});
        },
        remove: function(id) {
            return $http.delete(API_URL + '/clients/' + id).then(function(response) {
                return response.data;
            });
        }
    };
})

;