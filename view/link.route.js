const express = require('express');
const bodyParser= require('body-parser');
const linkcontroller= require('../controller/link');
const jwtmiddleware=require('../middleware/jwtmiddleware');
const Router= express.Router();
const app = express();
//app.use(jwtmiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.post('/link',jwtmiddleware,linkcontroller.createLink);
Router.delete('/deletelink/:linkId',jwtmiddleware,linkcontroller.deleteLink);
// Router.put('/updatelink/:linkId',linkcontroller.updateLink);
Router.get('/getlink',linkcontroller.getAllLinks);
module.exports=Router;