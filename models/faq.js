const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqScehma = new Schema({
    ques: String,
    ans: String,
    createdOn: Date

});
module.exports = mongoose.model('Faq', faqScehma);