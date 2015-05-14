'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * DW_R_MIN_LINE Schema
 */
var UID_SYS_MEASUREMENTSchema = new Schema({
    CREATETIME: {
		type: Date,
        default: Date.now
	},
    NAME: {
		type: String,
        default: '1'
	},
    RESOURCEID: {
        type: Number,
        default: 0
    },
    ALIASNAME: {
        type: String,
        default: '1'
    },
    SOURCE_GROUP: {
        type: String,
        default: '1'
    },
    DESCRIPTION: {
        type: String,
        default: '1'
    },
    TERMINAL: {
        type: String,
        default: '1'
    },
    SUBSTATION: {
        type: String,
        default: '1'
    },
    STATE: {
        type: String,
        default: '1'
    },
    TABLENAME: {
        type: String,
        default: '1'
    },
    COLUMNNAME: {
        type: String,
        default: '1'
    },
    MEASUREMENT_ID: {
		type: Number,
        default: 0
	},
    D5000ID: {
        type: Number,
        default: 0
    },
    D5000_OBJ_ID: {
        type: Number,
        default: 0
    },
    D5000_TABLE_ID: {
        type: Number,
        default: 0
    },
    D5000_COLUMN_ID: {
        type: Number,
        default: 0
    },
    D5000_COLUMNNAME: {
        type: String,
        default: '1'
    }
});

mongoose.model('UIP_SYS_MEASUREMENT', UID_SYS_MEASUREMENTSchema);
