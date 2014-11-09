var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema =  new Schema({
    title: String,
    description: String,
    contactMail: String,
    salary: Number,
    dateCreated: Date
});

module.exports = mongoose.model('Job', JobSchema);