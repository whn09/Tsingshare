'use strict';

// Configuring the Instant messages module
angular.module('imessages').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'IMessages', 'imessages', 'dropdown', '/imessages(/create)?');
		Menus.addSubMenuItem('topbar', 'imessages', 'List IMessages', 'imessages');
		Menus.addSubMenuItem('topbar', 'imessages', 'New IMessage', 'imessages/create');
	}
]);
