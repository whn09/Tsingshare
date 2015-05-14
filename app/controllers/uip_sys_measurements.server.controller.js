'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    UIP_SYS_MEASUREMENT = mongoose.model('UIP_SYS_MEASUREMENT'),
    User = mongoose.model('User'),
	_ = require('lodash');

exports.read = function(req, res) {
    var d5000Id = req.param('d5000Id');
    UIP_SYS_MEASUREMENT.find({'D5000ID':d5000Id}).limit(1).exec(function(err, results) {
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
    var d5000Ids = req.param('d5000Ids');
    var d5000IdsArr = d5000Ids.split(',');
    UIP_SYS_MEASUREMENT.find({'D5000ID':{$in:d5000IdsArr}}).exec(function(err, results) {
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
    UIP_SYS_MEASUREMENT.find().count(function (err, count) {
				if (err) {
					res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(count);
				}
			});
};

exports.list = function(req, res) {
    UIP_SYS_MEASUREMENT.find().limit(100).exec(function(err, results) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(results);
                }
	});
};


