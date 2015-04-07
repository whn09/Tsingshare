'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	IMessage = mongoose.model('IMessage'),
    User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create an instant message (imessage for short)
 */
exports.create = function(req, res) {

    var imessage = new IMessage(req.body);

    var userid = req.param('userid');
    if(userid === undefined) {
        userid = req.user;
    }
    var touserid = req.param('touserid');
    if(touserid === undefined) {
        touserid = req.user.lover;
    }
    var content = req.param('content');
    if(content !== undefined) {
        imessage.content = content;
    }

    imessage.user = userid;
    imessage.touser = touserid;

    imessage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
			socketio.sockets.emit('imessage.created', imessage); // emit an event for all connected clients
			res.json(imessage);
		}
	});
};

/**
 * Show the current instant message
 */
exports.read = function(req, res) {
	res.json(req.imessage);
};

/**
 * Update an instant message
 */
exports.update = function(req, res) {
	var imessage = req.imessage;

    imessage = _.extend(imessage, req.body);

    imessage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(imessage);
		}
	});
};

/**
 * Delete an instant message
 */
exports.delete = function(req, res) {
	var imessage = req.imessage;

    imessage.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(imessage);
		}
	});
};

exports.count = function(req, res) {
	var userid = req.param('userid');
	if(userid === undefined) {
		userid = req.user._id;
	}
	User.findById(userid, function(err, user) {
		if (!err && user) {
			//IMessage.count([{'touser': user.lover}, {'touser': user._id}], function (err, count) {
			IMessage.find().or([{'touser': user.lover}, {'touser': user._id}]).count(function (err, count) {
				if (err) {
					res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(count);
				}
			});
		} else {
			res.status(400).send({
				message: 'User is not found'
			});
		}
	});
};

/**
 * List of Messages, touser must be the user or the user's lover
 */
exports.list = function(req, res) {
    var userid = req.param('userid');
	var page = req.param('page')||1;
	var pagesize = req.param('pagesize')||10;
	//console.log("page = "+page);
    if(userid === undefined) {
        userid = req.user._id;
    }
    User.findById(userid, function(err, user) {
        if (!err && user) {
			var skipFrom = (page * pagesize) - pagesize;
			console.log(skipFrom);
            IMessage.find().sort('created').populate('user', 'displayName').populate('touser', 'displayName').or([{'touser': user.lover}, {'touser': user._id}]).skip(skipFrom).limit(pagesize).exec(function(err, imessages) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(imessages);
                }
            });
        } else {
            res.status(400).send({
                message: 'User is not found'
            });
        }
    });
};

/**
 * Instant message middleware
 */
exports.imessageByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'IMessage is invalid'
		});
	}

    IMessage.findById(id).populate('user', 'displayName').exec(function(err, imessage) {
		if (err) return next(err);
		if (!imessage) {
			return res.status(404).send({
  				message: 'IMessage not found'
  			});
		}
		req.imessage = imessage;
		next();
	});
};

/**
 * Instant message authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.imessage.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
