'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	imessages = require('../../app/controllers/imessages.server.controller');

module.exports = function(app) {
	// Instant message Routes
	app.route('/imessages/count') // 注意要放到/imessages前面，否则会出现错误{"message":"IMessage is invalid"}
		.get(imessages.count);

	app.route('/imessages')
		.get(imessages.list)
		.post(users.requiresLogin, imessages.create);

	app.route('/imessages/:imessageId')
		.get(imessages.read)
		.put(users.requiresLogin, imessages.hasAuthorization, imessages.update)
		.delete(users.requiresLogin, imessages.hasAuthorization, imessages.delete);

	// Finish by binding the imessage middleware
	app.param('imessageId', imessages.imessageByID);
};
