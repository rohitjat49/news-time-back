const mongoose = require('mongoose');

const {Schema}= mongoose;
// Define the schema for the Photo model
let cardphoto = new Schema({
  image:{
    client_id:{
        type:String,
        require:true
    },
    url: { type:  String     }
},
  headline:
  {
      type: String
  },
  description:{
type:String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
    collection:'cardphoto'
});

module.exports=mongoose.model('cardphoto', cardphoto);
