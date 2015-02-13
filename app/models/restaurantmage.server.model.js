'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * TODO DishImage Schema
 */
var RestaurantImageSchema = new Schema({
    created: { /* created time*/
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    url: { /* image url*/
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

mongoose.model('RestaurantImage', RestaurantImageSchema);
