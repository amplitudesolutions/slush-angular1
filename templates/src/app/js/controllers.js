angular.module('<%= appName %>.controllers', [
	'<%= appName %>.controllers.login',
	'<%= appName %>.controllers.dashboard',
	'ngAnimate'
])

.controller('mainCtrl', function(auth, $state) {
	var mc = this;
	mc.userName = auth.getDetails().name;

	mc.logout = function() {
		auth.logout();
		$state.go('login');
	};
})

;