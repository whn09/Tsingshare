'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	dw_r_min_line = require('../../app/controllers/DW_R_MIN_LINE.server.controller');

module.exports = function(app) {
	app.route('/dw_r_min_line/count') 
		.get(dw_r_min_line.count);

	app.route('/dw_r_min_line')
		.get(dw_r_min_line.list);

	app.route('/dw_r_min_line/:resourceId')
		.get(dw_r_min_line.read);

};
