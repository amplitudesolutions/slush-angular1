describe('Common Services', function() {
	var API_URL, $q, $httpBackend, $window;

	beforeEach(module(function($provide) {
		$provide.constant("API_URL", "http://localhost:443/api");
	}));

	beforeEach(angular.mock.module('<%= appName %>.services'));

	describe('authInterceptor', function() {	
		var authInterceptor, token, $location;

		beforeEach(inject(function(_authInterceptor_, _$window_, _$location_) {
			authInterceptor = _authInterceptor_;
			$window = _$window_;
			$location = _$location_;

			$window.sessionStorage.token = 'someToken';
		}));

		it('should be defined', function() {
			expect(authInterceptor).toBeDefined();
		});

		describe('.request', function() {
			it('should be defined', function() {
				expect(authInterceptor.request).toBeDefined();
			});

			it('should set token', function() {
				var config = authInterceptor.request({headers: {} });
				expect(config.headers.Authorization).toEqual('Bearer ' + 'someToken');
			});
		});

		describe('.responseError', function() {
			beforeEach(function() {
				spyOn($location, 'path').and.callThrough();
			});

			it('should be defined', function() {
				expect(authInterceptor.responseError).toBeDefined();
			});

			it('should delete token on 401 error', function() {
				authInterceptor.responseError({status: 401});
				expect($window.sessionStorage.token).toBeUndefined();
				expect($location.path).toHaveBeenCalledWith('/login');

			});

			it('should delete token on 403 error', function() {
				authInterceptor.responseError({status: 403});
				expect($window.sessionStorage.token).toBeUndefined();
				expect($location.path).toHaveBeenCalledWith('/login');
			});
		});
	});

	describe('auth', function() {
		var auth;

		beforeEach(function() {
			inject(function(_auth_,_$q_, _$httpBackend_, _API_URL_) {
				auth = _auth_;
				$q = _$q_;
				$httpBackend = _$httpBackend_;
				API_URL = _API_URL_;
			})

			$window.sessionStorage.token = 'TOKEN INFO HERE';
			$window.sessionStorage.user_id = 1;
			$window.sessionStorage.name = 'Test User';
			$window.sessionStorage.email = 'test@user.com';
		});

		it('should be defined', function() {
			expect(auth).toBeDefined();
		});

		describe('.authenticate()', function() {
			var result;

			var response = {
					message: 'Authentication successful',
					token: 'TOKEN FROM API HERE',
					user: {
						_id: 1,
						name: 'Saved User',
						email: 'saved@user.com'
					}
				};

			beforeEach(function() {
				result = {};
				
			});

			it('should exists', function() {
				expect(auth.authenticate).toBeDefined();
			});

			it('should return the token information and set windowSessionStorage', function() {
				spyOn(auth, 'authenticate').and.callThrough();

				$httpBackend.whenPOST(API_URL + '/authenticate', {email: 'saved@user.com', password: 'password123'}).respond(200, response);
				
				expect(auth.authenticate).not.toHaveBeenCalled();

				auth.authenticate('saved@user.com', 'password123').then(function(res) {
					result = res;
				});
				
				$httpBackend.flush();

				expect(auth.authenticate).toHaveBeenCalled();
				expect(result).toEqual(response);
				expect($window.sessionStorage.token).toEqual('TOKEN FROM API HERE');
				expect($window.sessionStorage.user_id).toEqual(response.user._id.toString());
				expect($window.sessionStorage.name).toEqual(response.user.name.toString());
				expect($window.sessionStorage.email).toEqual(response.user.email.toString());
			});
		});

		describe('.logout()', function() {		
			it('should exists', function() {
				expect(auth.logout).toBeDefined();
			});

			it('should delete the windowSessionStorage token', function() {
				expect($window.sessionStorage.token).toEqual('TOKEN INFO HERE');
				expect(auth.logout()).toBe(true);
				expect($window.sessionStorage.token).toBeUndefined();
			});
		});

		describe('.getDetails()', function() {
			it('should exists', function() {
				expect(auth.getDetails).toBeDefined();
			});

			it('should return the currently logged in user from windowSessionStorage', function() {
				expect(auth.getDetails()).toEqual({_id: '1', name: 'Test User', email: 'test@user.com'})
			});
		});

		describe('.changePassword()', function() {
			var result;

			var response = {
					message: 'Authentication successful'
				};

			beforeEach(function() {
				result = {};
				spyOn(auth, 'changePassword').and.callThrough();
			});

			it('should exists', function() {
				expect(auth.changePassword).toBeDefined();
			});

			it('should change the users password and return the status', function() {
				$httpBackend.whenPOST(API_URL + '/users/changepassword', {currentpassword: 'yes', newpassword: 'no', repeatpassword: 'no'}).respond(200, response);
				
				auth.changePassword('yes', 'no', 'no').then(function(response) {
					result = response;
				});

				$httpBackend.flush();

				expect(result).toEqual(response);				
			});
		});
	});
});