'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	DW_R_MIN_LINE = mongoose.model('DW_R_MIN_LINE'),
    User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Show the current instant message
 */
exports.read = function(req, res) {
	//res.json(req.imessage);
};

exports.count = function(req, res) {
		DW_R_MIN_LINE.find().count(function (err, count) {
				if (err) {
					res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(count);
				}
			});
};

/**
 * List of Messages, touser must be the user or the user's lover
 */
exports.list = function(req, res) {
           DW_R_MIN_LINE.find().limit(100).exec(function(err, results) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(results);
                }
	});
};


