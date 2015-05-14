'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	dw_r_min_line = require('../../app/controllers/dw_r_min_lines.server.controller');

module.exports = function(app) {
	app.route('/dw_r_min_lines/count')
		.get(dw_r_min_line.count);

    app.route('/dw_r_min_lines/create')
        .get(dw_r_min_line.create);

	app.route('/dw_r_min_lines')
		.get(dw_r_min_line.list);

	app.route('/dw_r_min_lines/read')
		.get(dw_r_min_line.read);

};
