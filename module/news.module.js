const mongoose = require('mongoose');

const {Schema}= mongoose;
// Define the schema for the Photo model
let photoupload = new Schema({
  file: {
    client_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true // Added required to ensure URL is provided
    }
  },
  headline:
  {
      type: String
  },
  description:{
    type:String
  },
  link:{
    type:String
  },
  state:{
    type:String
  },
  district:{
    type:String
  },
  city:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
    collection:'news'
});

module.exports=mongoose.model('news', photoupload);
