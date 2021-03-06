'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * TODO Dish Schema
 */
var DishSchema = new Schema({
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
    type: {
        type: Schema.ObjectId,
        ref: 'DishType'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant'
    }
});

mongoose.model('Dish', DishSchema);
