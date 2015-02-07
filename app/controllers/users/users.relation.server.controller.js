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
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};
