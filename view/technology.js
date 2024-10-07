const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/mediaupload');
const filecontroler= require('../controller/technology');
const jwtmiddleware=require('../middleware/jwtmiddleware');

Router.post('/technology', jwtmiddleware,middleware, filecontroler.add);
Router.get('/gettechnology',filecontroler.get);
Router.delete('/deletetechnology/:id',jwtmiddleware,filecontroler.delete);

module.exports=Router;