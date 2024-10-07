// photoUploadRoute.js
const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/mediaupload');
const jwtmiddleware=require('../middleware/jwtmiddleware');
const cardcontroler= require('../controller/cardphoto');

// POST route for uploading a single photo
Router.post('/cardphoto',jwtmiddleware, middleware, cardcontroler.cardphoto);
Router.get('/getonecard/:Id',cardcontroler.getProduct);
Router.get('/getcard',cardcontroler.getAllcard);
Router.delete('/deletecard/:id',jwtmiddleware,cardcontroler.deleteCard);
module.exports = Router;