'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * TODO TravelRecord Schema
 */
var TravelRecordSchema = new Schema({
    created: { /* created time*/
        type: Date,
        default: Date.now
    },
    time: { /* activity time*/
        type: Date,
        default: Date.now
    },
    description: { /* the activity description*/
        type: String,
        default: '',
        trim: true
    },
    user: { /* the create user (he/she can create activity only after he/she has a lover, and his/her lover can also create/edit/delete the activity)*/
        type: Schema.ObjectId,
        ref: 'User'
    },
    memory: { /* the related memorial day*/
        type: Schema.ObjectId,
        default: '',
        ref: 'Memory'
    },
    touser: { /* unused*/
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('TravelRecord', TravelRecordSchema);
