const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/mediaupload');
const filecontroler= require('../controller/entertainment');
const jwtmiddleware=require('../middleware/jwtmiddleware');

Router.post('/add', jwtmiddleware,middleware, filecontroler.add);
Router.get('/get',filecontroler.get);
Router.get('/esearch',filecontroler.search);
Router.delete('/delete/:id',jwtmiddleware,filecontroler.delete);

module.exports=Router;
