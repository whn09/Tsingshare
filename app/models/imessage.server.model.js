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
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true,
        required: 'Content cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    touser: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('IMessage', IMessageSchema);
