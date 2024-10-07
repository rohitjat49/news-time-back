const express=require('express');
const Router = express.Router();
const bodyParser = require('body-parser');
const usercontroller=require('../controller/user');
const app= express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Router.post('/user',usercontroller.noti);
module.exports = Router;