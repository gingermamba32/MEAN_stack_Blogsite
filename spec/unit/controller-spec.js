'use strict';

/* jasmine specs for controllers go here */
	describe('myBlog controllers', function() {

	beforeEach(module('messageApp'));

	it('should create posts object with two posts', inject(function($controller) {
		var scope = {},
		ctrl = $controller('MessageCtrl', {$scope:scope});

		expect(scope.messages.length).toBe(2);
	}));
});