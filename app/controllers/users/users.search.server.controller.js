'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * TODO
 *
 */

/**
 * Search user
 */
exports.search = function(req, res) {
    // Init Variables
    var user = req.user;
    var userid = req.param('userid');
    var message = null;

    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    if (user) {
        User.findById(userid, function(err, resultuser) {
            if (!err && resultuser) {
                if(user.username != resultuser.username) {
                    res.json(resultuser);
                }
                else {
                    res.status(400).send({
                        message: 'You can\'t search yourself'
                    });
                }
            } else {
                res.status(400).send({
                    message: 'User is not found'
                });
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};
