'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Relation = mongoose.model('Relation'),
    User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a relation
 */
exports.create = function(req, res) {
	var relation = new Relation(req.body);
    relation.user = req.user;
    var userid = req.param('userid');
    var touser;
    User.findById(userid, function(err, resultuser) {
        if (!err && resultuser) {
            if(req.user.username != resultuser.username) {
                touser = resultuser;
                //res.json(resultuser._id);
            }
            else {
                res.status(400).send({
                    message: 'You can\'t bind yourself'
                });
            }
        } else {
            res.status(400).send({
                message: 'User is not found'
            });
        }
    });
    relation.touser = touser;

    relation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(relation);
		}
	});
};

/**
 * Update a relation
 */
exports.update = function(req, res) {
	var relation = req.relation;

    relation = _.extend(relation, req.body);

    relation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(relation);
		}
	});
};
