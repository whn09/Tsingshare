'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Memory Schema
 */
var MemorySchema = new Schema({
    created: { /* created time*/
        type: Date,
        default: Date.now
    },
    type: { /* memorial day type*/
        type: String,
        //enum: ['birthday', 'love', 'kiss', 'sex', ...], // allow users define
        default: 'love',
        trim: true
    },
    remind: { /* remind interval*/
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'yearly',
        trim: true
    },
    remindbefore: { /* the remind time before memorial day*/
        type: String,
        enum: ['1month', '1week', '1day', '1hour', '10minutes'],
        default: '1month',
        trim: true
    },
    status: { /* whether reminded*/
        type: String,
        enum: ['reminded', 'toremind'],
        default: 'toremind',
        trim: true
    },
    user: { /* the create user (he/she can create memorial day only after he/she has a lover, and his/her lover can also create/edit/delete the memorial day)*/
        type: Schema.ObjectId,
        ref: 'User'
    },
    touser: { /* unused*/
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Memory', MemorySchema);
