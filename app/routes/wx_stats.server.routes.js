'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	wx_stats = require('../../app/controllers/wx_stats.server.controller');

module.exports = function(app) {
	// wx_stats Routes
	app.route('/wx_stats')
		.get(wx_stats.list);

};
