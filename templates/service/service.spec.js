describe('Clients Factory', function() {
	var clients, API_URL, $httpBackend, $q;

	beforeEach(module(function($provide) {
		$provide.constant("API_URL", "http://localhost:443/api");
	}));

	var clientList = [
	{
		_id: 1,
		name: 'Client 1',
		phonenumber: '111-222-3333',
		email: 'user1@test.com',
		website: 'www.client.com',
		businesshours: 'M-F 9-5',
		description: 'Client 1 description',
		active: true
	},
	{
		_id: 2,
		name: 'Client 2',
		phonenumber: '444-333-2222',
		email: 'user2@test.com',
		website: 'www.client2.com',
		businesshours: 'S-S 12-12',
		description: 'Client 2 description',
		active: true
	}];

	beforeEach(angular.mock.module('itdocs.services.clients'));

	beforeEach(inject(function(_clients_,_$q_, _$httpBackend_, _API_URL_) {
		clients = _clients_;
		$q = _$q_;
		$httpBackend = _$httpBackend_;
		API_URL = _API_URL_;
	}));

	it('should exist', function() {
		expect(clients).toBeDefined();
	});

	describe('.get()', function() {
		beforeEach(function() {
			result = {};
			spyOn(clients, "get").and.callThrough();
		});


		it('should exist', function() {
			expect(clients.get).toBeDefined();
		});

		it('should return a list of clients', function() {
			$httpBackend.whenGET(API_URL + '/clients').respond(200, $q.when(clientList));

			expect(clients.get).not.toHaveBeenCalled();
			expect(result).toEqual({});

			clients.get().then(function(res) {
				result = res;
			});

			$httpBackend.flush();

			expect(clients.get).toHaveBeenCalled();
			expect(result.length).toBe(2);
			expect(result[0]._id).toEqual(1);
			expect(result[0].name).toEqual('Client 1');
			expect(result[0].phonenumber).toEqual('111-222-3333');
			expect(result[0].email).toEqual('user1@test.com');
			expect(result[0].website).toEqual('www.client.com');
			expect(result[0].businesshours).toEqual('M-F 9-5');
			expect(result[0].description).toEqual('Client 1 description');
			expect(result[0].active).toEqual(true);
		});
	});

	describe('.getById()', function() {
		beforeEach(function() {
			result = {};
			spyOn(clients, "getById").and.callThrough();
		});


		it('should exist', function() {
			expect(clients.getById).toBeDefined();
		});

		it('should return a clients when called with a valid id', function() {
			$httpBackend.whenGET(API_URL + '/clients/' + 1).respond(200, $q.when(clientList[0]));

			expect(clients.getById).not.toHaveBeenCalled();
			expect(result).toEqual({});

			clients.getById(1).then(function(res) {
				result = res;
			});

			$httpBackend.flush();

			expect(result._id).toEqual(1);
			expect(result.name).toEqual('Client 1');
			expect(result.phonenumber).toEqual('111-222-3333');
			expect(result.email).toEqual('user1@test.com');
			expect(result.website).toEqual('www.client.com');
			expect(result.businesshours).toEqual('M-F 9-5');
			expect(result.description).toEqual('Client 1 description');
			expect(result.active).toEqual(true);
		});
	});

	describe('.add()', function() {
		beforeEach(function() {
			result = {};
			spyOn(clients, "add").and.callThrough();
		});

		it('should exist', function() {
			expect(clients.add).toBeDefined();
		});

		it('should add a new client and return the added clients data', function() {
			var newClient = {
				name: 'Client 4',
				phonenumber: '555-555-5555',
				email: 'user5@test.com',
				website: 'www.client5.com',
				businesshours: 'M-F 12-12',
				description: 'Client 5 description',
				active: true
			};

			var response = {
				_id: 4,
				name: 'Client 4',
				phonenumber: '555-555-5555',
				email: 'user5@test.com',
				website: 'www.client5.com',
				businesshours: 'M-F 12-12',
				description: 'Client 5 description',
				active: true
			};

			$httpBackend.whenPOST(API_URL + '/clients', newClient).respond(200, $q.when(response));

			expect(clients.add).not.toHaveBeenCalled();
			expect(result).toEqual({});

			clients.add(newClient).then(function(res) {
				result = res;
			});

			$httpBackend.flush();

			expect(clients.add).toHaveBeenCalledWith(newClient);
			expect(result._id).toEqual(4);
			expect(result.name).toEqual(newClient.name);
			expect(result.phonenumber).toEqual(newClient.phonenumber);
			expect(result.email).toEqual(newClient.email);
			expect(result.website).toEqual(newClient.website);
			expect(result.businesshours).toEqual(newClient.businesshours);
			expect(result.description).toEqual(newClient.description);
			expect(result.active).toEqual(newClient.active);
		});
	});

	describe('.save()', function() {
		beforeEach(function() {
			result = {};
			spyOn(clients, "save").and.callThrough();
		});

		it('should exist', function() {
			expect(clients.save).toBeDefined();
		});

		it('should save a client and return the clients data', function() {
			var editClient = clientList[1];

			editClient.name = 'Client 33';
			editClient.email = 'client33@email.com';
			editClient.phonenumber = '666-666-6666',
			editClient.website = 'www.client33.com',
			editClient.businesshours = 'Sunday Only',
			editClient.description = 'very good little business',
			editClient.active = false;

			var response = editClient;

			$httpBackend.whenPUT(API_URL + '/clients/' + editClient._id, editClient).respond(200, $q.when(response));

			expect(clients.save).not.toHaveBeenCalled();
			expect(result).toEqual({});

			clients.save(editClient).then(function(res) {
				result = res;
			});

			$httpBackend.flush();

			expect(clients.save).toHaveBeenCalledWith(editClient);
			expect(result._id).toEqual(2);
			expect(result.name).toEqual(editClient.name);
			expect(result.phonenumber).toEqual(editClient.phonenumber);
			expect(result.email).toEqual(editClient.email);
			expect(result.website).toEqual(editClient.website);
			expect(result.businesshours).toEqual(editClient.businesshours);
			expect(result.description).toEqual(editClient.description);
			expect(result.active).toEqual(editClient.active);
		});
	});

	describe('.remove()', function() {
		beforeEach(function() {
			result = {};
			spyOn(clients, "remove").and.callThrough();
		});

		it('should exist', function() {
			expect(clients.remove).toBeDefined();
		});

		it('should remove a user based on id', function() {
			var response = {message: 'Client Deleted'};

			$httpBackend.whenDELETE(API_URL + '/clients/' + 2).respond(200, $q.when(response));

			expect(clients.remove).not.toHaveBeenCalled();
			expect(result).toEqual({});

			clients.remove(2).then(function(res) {
				result = res;
			});

			$httpBackend.flush();

			expect(clients.remove).toHaveBeenCalledWith(2);
			expect(result.message).toEqual('Client Deleted');
		});
	});
});