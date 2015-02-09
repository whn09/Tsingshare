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
    type: {
        type: String,
        enum: ['lover', 'father', 'mother', 'grandfather', 'grandmother', 'grandpa', 'grandma', 'brother', 'youngerbrother', 'sister', 'youngersister'],
        default: 'lover',
        trim: true
    },
    touser: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Relation', RelationSchema);
