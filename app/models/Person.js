var mongoose = require('mongoose');

var personSignupSchema =

module.exports = mongoose.model('Person', {
    firstName:String,
    lastName:String,
    email:String
});
