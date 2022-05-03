const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const userScehma = new Schema({
    name: {
        type: String,
        required: true,
    },
    maxLevel: {
        type: Number,
        default: 0
    },
    resetLinkCount: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

});
userScehma.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userScehma);