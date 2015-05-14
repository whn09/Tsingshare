'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    uip_sys_measurements = require('../../app/controllers/uip_sys_measurements.server.controller');

module.exports = function(app) {
	app.route('/uip_sys_measurements/count')
		.get(uip_sys_measurements.count);

	app.route('/uip_sys_measurements')
		.get(uip_sys_measurements.list);

	app.route('/uip_sys_measurements/read')
		.get(uip_sys_measurements.read);

    app.route('/uip_sys_measurements/batchread')
        .get(uip_sys_measurements.batchread);

};
