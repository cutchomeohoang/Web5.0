var mongoose = require('mongoose');
var User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    grade: String
})
module.exports = mongoose.model('User', User);