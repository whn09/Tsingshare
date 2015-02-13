'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * TODO RestaurantComment Schema
 */
var RestaurantCommentSchema = new Schema({
    created: { /* created time*/
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('RestaurantComment', RestaurantCommentSchema);
