const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB');
const dotenv = require('dotenv');
const loginRoutes = require('./view/login.route');
const signupRoutes = require('./view/signup.route');
//const jwtmiddleware = require('./middleware/jwtmiddleware');
const otpRoutes=require('./view/otp.route')
const forgetpasswordRoutes=require('./view/forget.route');
const newsRoutes=require('./view/news.route');
//const videoRoutes=require('./view/video.route');
const cloudinary=require('cloudinary');
const userRoute=require('./view/user.route');
const breakingRoute=require('./view/breaking.route');
const linkRoute=require('./view/link.route');
const cardRoute=require('./view/card.route');
const entertainment=require('./view/entertainment');
const education=require('./view/education');
const technology=require('./view/technology');
const election=require('./view/election');
dotenv.config();
const app = express();
const port = process.env.PORT || 3200;

// Middleware
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/',userRoute);
app.use('/',cardRoute);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/',otpRoutes);
app.use('/forget-password',forgetpasswordRoutes);
app.use('/',newsRoutes);
app.use('/',entertainment); 
app.use('/',education);
app.use('/',breakingRoute);
app.use('/',technology);
app.use('/',linkRoute);
app.use('/',election);
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
});


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database is connected ' );
}).catch((err) => {
  console.error('Cannot connect to the database ' + err);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
