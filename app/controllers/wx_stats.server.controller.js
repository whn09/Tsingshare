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
    var articleid = req.param('articleid');
    if(articleid === undefined) {
        res.status(400).send({
            message: 'No articleid'
        });
    }
    WX_STAT.find({'articleid': articleid}).sort('gettime').exec(function(err, wx_stats) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(wx_stats);
		}
	});
};
