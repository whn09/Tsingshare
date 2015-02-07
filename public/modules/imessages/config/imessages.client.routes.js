'use strict';

// Setting up route
angular.module('imessages').config(['$stateProvider',
	function($stateProvider) {
		// Instant messages state routing
		$stateProvider.
		state('listIMessages', {
			url: '/imessages',
			templateUrl: 'modules/imessages/views/list-imessages.client.view.html'
		}).
		state('createIMessage', {
			url: '/imessages/create',
			templateUrl: 'modules/imessages/views/create-imessage.client.view.html'
		}).
		state('viewIMessage', {
			url: '/imessages/:imessageId',
			templateUrl: 'modules/imessages/views/view-imessage.client.view.html'
		}).
		state('editIMessage', {
			url: '/imessages/:imessageId/edit',
			templateUrl: 'modules/imessages/views/edit-imessage.client.view.html'
		});
	}
]);
