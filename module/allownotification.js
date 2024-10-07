const mongoose = require("mongoose");

const {Schema}= mongoose;

let allownotification = new Schema({
   message:{
    type:String
   },
    allowat: {
        type: Date,
        default: Date.now
      }
    
},
{
    collection: "notificationallow"
});
module.exports= mongoose.model("notificationallow",allownotification);