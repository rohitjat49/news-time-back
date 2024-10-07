const allow = require('../module/allownotification');
const user=require('../module/user');

exports.allownoti= async(req,res)=>{
   try{
    const userId= await user.find({});
    
    const allownotification= new allow({notification:userId});
    await allownotification.save();
    res.status(200).json({message:'allow to get all notifications'});

   }catch(err){
    console.error(err);
    res.status(500).json({message:'internal server error'});
    
   } 
   
}