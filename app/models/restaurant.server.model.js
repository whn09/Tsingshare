'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * TODO Restaurant Schema
 */
var RestaurantSchema = new Schema({
    created: { /* created time*/
        type: Date,
        default: Date.now
    },
    description: { /* the gift description*/
        type: String,
        default: '',
        trim: true
    },
    user: { /* the create user (he/she can create gift only after he/she has a lover, and his/her lover can also create/edit/delete the gift)*/
        type: Schema.ObjectId,
        ref: 'User'
    },
    touser: { /* unused*/
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Restaurant', RestaurantSchema);
