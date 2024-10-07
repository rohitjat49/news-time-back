const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/mediaupload');
const filecontroler= require('../controller/election');
const jwtmiddleware=require('../middleware/jwtmiddleware');

Router.post('/election', jwtmiddleware,middleware, filecontroler.add);
Router.get('/getelection',filecontroler.get);
Router.delete('/deleteelection/:id',jwtmiddleware,filecontroler.delete);

module.exports=Router;