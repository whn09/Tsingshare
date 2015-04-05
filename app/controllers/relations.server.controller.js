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
    relation.touser = req.param('userid');
    if(relation.user === relation.touser) {
        return res.status(400).send({
            message: 'You can\'t send request to yourself'
        });
    }
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
    Relation.findById(req.param('relationid'), function(err, relation) {
        if(err || !relation) {
            return res.status(400).send({
                message: 'No relation'
            });
        }
        else {
            relation = _.extend(relation, req.body);

            relation.save(function(err) {
                if (err) {
                    return res.status(401).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    if(req.param('status') === 'accepted') {
                        // set req.user.lover to request user, and request user.lover to req.user
                        //res.json('accepted');
                        var user = new User();
                        user.updateLover(relation.user, relation.touser, function(err) {
                            if(err) {
                                return res.status(402).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            }
                        });
                        user.updateLover(relation.touser, relation.user, function(err) {
                            if(err) {
                                return res.status(403).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            }
                        });
                    }
                    res.json(relation);
                }
            });
        }
    });
};

/**
 * get all requesters
 */
exports.requesters = function(req, res) {
    var userid = req.user._id;
    var relation = new Relation();
    relation.getAllRequesters(userid, function(err, requesters) {
        if(err || !requesters || requesters.length === 0) {
            return res.status(400).send({
                message: 'No requester'
            });
        }
        else {
            res.json(requesters);
        }
    });
};

/**
 * get my request
 */
exports.myrequest = function(req, res) {
    var userid = req.user._id;
    var relation = new Relation();
    relation.getMyRequest(userid, function(err, request) {
        if(err || !request || request.length === 0) {
            return res.status(400).send({
                message: 'No request'
            });
        }
        else {
            res.json(request);
        }
    });
};
