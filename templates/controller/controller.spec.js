describe('Clients Controller', function() {
	var $controller, API_URL;

	beforeEach(module(function($provide) {
		$provide.constant("API_URL", "http://localhost:443/api");
	}));

	beforeEach(angular.mock.module('ui.router'));
	
	// beforeEach(angular.mock.module('itdocs.services'));
	beforeEach(angular.mock.module('itdocs.controllers.clients'));

	beforeEach(inject(function(_$controller_, _API_URL_) {
		$controller = _$controller_;
		API_URL = _API_URL_;
	}));

	describe('clientCtrl', function() {
		var clientCtrl;

		beforeEach(function() {
			clientCtrl = $controller('clientCtrl');
		});

		it('should be defined', function() {
			expect(clientCtrl).toBeDefined();
		});
	});
});