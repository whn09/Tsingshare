'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    nodeApn = require('./nodeapn.server.controller'),
    nodeBaiduPush = require('./nodebaidupush.server.controller'),
	IMessage = mongoose.model('IMessage'),
    User = mongoose.model('User'),
	_ = require('lodash');

/*var JPush = require('node_modules/jpush-sdk/lib/JPush/JPush.js');
var client = JPush.buildClient('bc3d97771da3e62535150191', 'f7cfadf2b88754b55eb0606d');

client.push().setPlatform('ios', 'android')
	.setAudience(JPush.tag('555', '666'), JPush.alias('666,777'))
	.setNotification('Hi, JPush', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
	.setMessage('msg content')
	.setOptions(null, 60)
	.send(function(err, res) {
		if (err) {
			console.log(err.message);
		} else {
			console.log('Sendno: ' + res.sendno);
			console.log('Msg_id: ' + res.msg_id);
		}
	});*/

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
			// TODO 现在的实现方法是对所有用户广播，这样是不对的，主要是增加了服务器负载（因为可以在客户端识别是否是广播给自己的，所以可以避免广播错误），要修改
			var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
			socketio.sockets.emit('imessage.created', imessage); // emit an event for all connected clients

            User.findById(touserid, function(err, touser) {
                if (!err && touser) {
                    if(touser.ios_token !== '') {
                        nodeApn.pushOneNotification(touser.ios_token);
                    }
                    if(touser.android_token !== '') {
                        //nodeBaiduPush.
                    }
                }
            });

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
			//console.log(skipFrom);
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
