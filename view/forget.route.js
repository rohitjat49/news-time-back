const express = require('express');
const bodyParser= require('body-parser');
const forgotpasscontroler= require('../controller/forgetpassword');
const Router= express.Router();
const app = express();
//app.use(jwtmiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.put('/:userId', forgotpasscontroler.forgotpassword);
module.exports=Router;