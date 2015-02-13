'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * TODO DishComment Schema
 */
var DishCommentSchema = new Schema({
    created: { /* created time*/
        type: Date,
        default: Date.now
    },
    content: {
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

mongoose.model('DishComment', DishCommentSchema);
