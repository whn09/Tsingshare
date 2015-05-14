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
		type: Date
	},
	RESOURCEID: {
		type: String
	},
	T_ID: {
		type: Date
	},
	I: {
		type: Number
	},
	MW: {
		type: Number
	},
	MX: {
		type: Number
	},
	LAST_UPDATE: {
		type: Date
	},
	MX_UPDATE: {
		type: Date
	}
});

mongoose.model('DW_R_MIN_LINE', DW_R_MIN_LINESchema);
