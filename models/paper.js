/**
 * Created by tiffanyraill on 2017-03-27.
 */
var mongoose = require('mongoose');

// create paper schema (class)
var paperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    course: {
        type: String,
        required: 'Course is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    }
});

// make it public
module.exports = mongoose.model('Paper', paperSchema);