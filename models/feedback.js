const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    username: String,
    name: String,
    message: String,
    createdOn: new Date()
});
module.exports = mongoose.model('Comment', feedbackSchema);