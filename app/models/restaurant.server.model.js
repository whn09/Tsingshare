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
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    url: { /* dianping url*/
        type: String,
        default: '',
        trim: true
    },
    lat: {
        type: String,
        default: '',
        trim: true
    },
    lng: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: Schema.ObjectId,
        ref: 'RestaurantType'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Restaurant', RestaurantSchema);
