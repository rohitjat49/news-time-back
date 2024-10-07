const express= require('express');
const Router= express.Router();
const bodyParser=require('body-parser');
const allowcontroler= require('../controller/allownotification');
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/allow',Router);
Router.post('/',allowcontroler.allownoti);
module.exports=Router;