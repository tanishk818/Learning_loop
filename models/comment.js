const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentScehma=new Schema({
    Username:String,
    message:String
    
});
module.exports = mongoose.model('Comment',commentScehma);