// photoUploadRoute.js
const express = require('express');
const Router = express.Router();
const middleware= require('../middleware/mediaupload');
// const video=require('../middleware/videoupload');
const filecontroler= require('../controller/breaking');
const jwtmiddleware=require('../middleware/jwtmiddleware')
// POST route for uploading a single photo
Router.post('/breakingnews', jwtmiddleware,middleware, filecontroler.uploadfile);
Router.get('/getbreakingnews',filecontroler.getbreakingnews);
Router.get('/getonebreakingnews/:Id',filecontroler.getonebreakingnews);
Router.delete('/deletebreakingnews/:id',jwtmiddleware,filecontroler.deletebreakingnews);
module.exports = Router;