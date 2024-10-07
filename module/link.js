const mongoose = require('mongoose');

const link = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
},{
    collection:'link'
});
module.exports=mongoose.model('link',link);