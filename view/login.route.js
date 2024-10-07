const express = require ("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const logincontroler= require('../controller/login');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login',Router);
Router.post('/',logincontroler.login);

module.exports = Router;