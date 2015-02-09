'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Instant message Schema
 */
var IMessageSchema = new Schema({
	created: { /* created time*/
		type: Date,
		default: Date.now
	},
	title: { /* unused*/
		type: String,
		default: '',
		trim: true
	},
	content: { /* instant message content*/
		type: String,
		default: '',
		trim: true,
        required: 'Content cannot be blank'
	},
	user: { /* the create user (he/she can create instant message only after he/she has a lover*/
		type: Schema.ObjectId,
		ref: 'User'
	},
    touser: { /* unused*/
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('IMessage', IMessageSchema);
