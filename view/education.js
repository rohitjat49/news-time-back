const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/mediaupload');
const filecontroler= require('../controller/education');
const jwtmiddleware=require('../middleware/jwtmiddleware');

Router.post('/education', jwtmiddleware,middleware, filecontroler.add);
Router.get('/geteducation',filecontroler.get);
Router.delete('/deleteeducation/:id',jwtmiddleware,filecontroler.delete);

module.exports=Router;