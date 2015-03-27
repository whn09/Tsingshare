'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * WX_STAT Schema
 */
var WX_STATSchema = new Schema({
	gettime: {
		type: Date,
		default: Date.now
	},
	readnum: {
		type: Number,
		default: 0,
		trim: true
	},
    likenum: {
        type: Number,
        default: 0,
        trim: true
    },
	articleid: {
		type: Schema.ObjectId,
		ref: 'Article'
	}
});

mongoose.model('WX_STAT', WX_STATSchema);
