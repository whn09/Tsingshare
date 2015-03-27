'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	WX_STAT = mongoose.model('WX_STAT'),
	_ = require('lodash');

/**
 * List of WX_STAT
 */
exports.list = function(req, res) {
    WX_STAT.find().sort('gettime').exec(function(err, wx_stats) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(wx_stats);
		}
	});
};
