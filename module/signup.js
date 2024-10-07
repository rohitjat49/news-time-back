const mongoose = require("mongoose");

const {Schema}= mongoose;

let user = new Schema({
    _id:{
        type:String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
    
},
{
    collection: "signup"
});
module.exports= mongoose.model("signup",user);