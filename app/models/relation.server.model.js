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

/**
 * Get all requesters
 */
RelationSchema.methods.getAllRequesters = function getAllRequesters(userid, callback) {
    return this.model('Relation').find({touser: userid, status: 'requested'}, callback);
};

/**
 * Get my request
 */
RelationSchema.methods.getMyRequest = function getMyRequest(userid, callback) {
    return this.model('Relation').findOne({user: userid, status: 'requested'}, callback);
};

mongoose.model('Relation', RelationSchema);
