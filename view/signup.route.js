const express = require ("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const signgupcontroler= require('../controller/signup');
const app = express();


// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//signup api
app.use('/signup',Router);

Router.post('/',signgupcontroler.signup);

module.exports = Router;
