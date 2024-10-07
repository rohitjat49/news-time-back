const mongoose= require("mongoose");

const {Schema}= mongoose;

let o= new Schema({
 
    email:{
        type:String
    },
    otp:{
        type:String
    }},
 {
    collection:"otp"
   
});
module.exports=mongoose.model("otp",o);