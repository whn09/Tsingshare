'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * TODO DishImage Schema
 */
var DishImageSchema = new Schema({
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
    dish: {
        type: Schema.ObjectId,
        ref: 'Dish'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('DishImage', DishImageSchema);
