'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Relation Schema
 */
var RelationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'rejected'],
        default: 'requested',
        trim: true
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

mongoose.model('Relation', RelationSchema);
