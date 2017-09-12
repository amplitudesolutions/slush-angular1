'use strict';

angular.module('<%= appName %>', [
    'ui.router',
    'ui.bootstrap',
	'<%= appName %>.services',
	'<%= appName %>.controllers'
]);