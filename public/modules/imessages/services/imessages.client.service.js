'use strict';

//Instant messages service used for communicating with the imessages REST endpoints
angular.module('imessages').factory('IMessages', ['$resource',
	function($resource) {
		return $resource('imessages/:imessageId', {
            imessageId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
