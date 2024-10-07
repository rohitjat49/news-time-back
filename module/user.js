const mongoose = require("mongoose");

const {Schema}= mongoose;

let user = new Schema({
    _id:{
        type:String
    } 
},
{
    collection: "user"
});
module.exports= mongoose.model("user",user);