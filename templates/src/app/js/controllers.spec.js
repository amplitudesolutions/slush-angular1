describe('Main Controller', function() {
	var $controller, AuthFactory, $state, API_URL;

	beforeEach(module(function($provide) {
		$provide.constant("API_URL", "http://localhost:443/api");
	}));

	beforeEach(angular.mock.module('ui.router'));
	
	beforeEach(angular.mock.module('<%=appName%>.services'));
	beforeEach(angular.mock.module('<%=appName%>.controllers'));

	beforeEach(inject(function(_$controller_, _auth_, _$state_, _API_URL_) {
		$controller = _$controller_;
		AuthFactory = _auth_;
		$state = _$state_;
		API_URL = _API_URL_;
	}));

	describe('mainCtrl', function() {
		var mainCtrl;
		var userDetails = {
			_id: 1,
			name: 'First Last',
			email: 'first@last.com'
		};

		beforeEach(function() {
			spyOn(AuthFactory, 'getDetails').and.returnValue(userDetails);
			spyOn($state, 'go');
			spyOn(AuthFactory, 'logout').and.callThrough();
			mainCtrl = $controller('mainCtrl', {auth: AuthFactory, $state: $state});
		});

		it('should be defined', function() {
			expect(mainCtrl).toBeDefined();
		});

		it('should get user details', function() {
			expect(mainCtrl.userName).toEqual(userDetails.name);
		});

		it('should log the user out', function() {
			mainCtrl.logout();
			expect(AuthFactory.logout).toHaveBeenCalled();
			expect($state.go).toHaveBeenCalledWith('login');
		});
	});
});