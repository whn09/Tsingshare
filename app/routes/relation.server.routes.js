'use strict';

/**
 * Module dependencies.
 */
var relations = require('../../app/controllers/relations.server.controller');

module.exports = function(app) {
	// Relation Routes

    // Setting up the relation api
    app.route('/relation/request').post(relations.create);
    app.route('/relation/accept').post(relations.update);
    app.route('/relation/reject').post(relations.update);
    app.route('/relation/requesters').get(relations.requesters);
    app.route('/relation/myrequest').get(relations.myrequest);

	// Finish by binding the relation middleware
	//app.param('relationId', relations.relationByID);
};
