'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * DW_R_MIN_LINE Schema
 */
var DW_R_MIN_LINESchema = new Schema({
	MW_UPDATE: {
		type: Date,
        default: Date.now
	},
	RESOURCEID: {
		type: String,
        default: '1'
	},
	T_ID: {
		type: Date,
        default: Date.now
	},
	I: {
		type: Number,
        default: 0
	},
	MW: {
		type: Number,
        default: 0
	},
	MX: {
		type: Number,
        default: 0
	},
	LAST_UPDATE: {
		type: Date,
        default: Date.now
	},
	MX_UPDATE: {
		type: Date,
        default: Date.now
	}
});

mongoose.model('DW_R_MIN_LINE', DW_R_MIN_LINESchema);
