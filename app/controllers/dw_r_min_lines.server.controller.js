'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	DW_R_MIN_LINE = mongoose.model('DW_R_MIN_LINE'),
    User = mongoose.model('User'),
	_ = require('lodash');

exports.read = function(req, res) {
    var resourceId = req.param('resourceId');
    DW_R_MIN_LINE.find({'RESOURCEID':resourceId}).sort({'_id':-1}).limit(1).exec(function(err, results) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(results);
        }
    });
};

exports.batchread = function(req, res) {
    var resourceIds = req.param('resourceIds');
    var resourceIdsArr = resourceIds.split(',');
    DW_R_MIN_LINE.find({'RESOURCEID':{$in:resourceIdsArr}}).exec(function(err, results) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(results);
        }
    });
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

exports.create = function(req, res) {

    var dw_r_min_line = new DW_R_MIN_LINE(req.body);
    dw_r_min_line.I = 1;

    dw_r_min_line.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(dw_r_min_line);
        }
    });
};

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


