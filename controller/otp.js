const nodemailer = require('nodemailer');
const otp = require('../module/otp.module'); // Import the otp module at the beginning
const signup = require('../module/signup');
require("dotenv").config()

exports.genrateotp= async(req,res)=>{
    const { email } = req.body;

  if (!email ) {
    return res.status(400).json({ message: 'Email or mobile number is required' });
  }
  const user = await signup.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'please enter vaild email address' });
}
  
  const generatedOTP = generateNumericOTP(6);



  // Save the generated OTP to the database or in-memory store (assuming you have a database or store logic)
  try {
    const newOtp = new otp({
      email,
      number,
      otp: generatedOTP,
    });

    await newOtp.save();
    res.json({ message: 'OTP generated and saved to the database' });

    // Send OTP to the provided email or mobile number
    if (email) {
      sendOTPEmail(email, generatedOTP);
    } else {
      // Logic to send OTP to mobile number
    }

    // Log the result
  } catch (err) {
    console.error('Error saving OTP to the database:', err);
    res.status(500).json({ message: 'Error saving OTP to the database', error: err });
  }
}

function generateNumericOTP(length) {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}

function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: 'as9926261097@gmail.com', // Your email
      // pass: 'ujzh vomm qemq hqkd', // Your email password
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    // from: 'as9926261097@gmail.com', // Your email
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "OTP for Verification",
    text: `Your OTP for verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

exports.verifyotp=async(req,res)=>{
    const{otp}= req.body;
    console.log("request otp:",otp);
    try{
      //console.log("shruti");
      const o= await otpModel.findOne({otp});
      console.log( "databse otp:",o);
      if(!o){
  return res.status(401).json({message:' otp is not correct'});
      }
      const verifyotp =  o.otp === otp;
      console.log(o.otp);
    console.log("verificaton result:", verifyotp);
      if(verifyotp){
        res.json({message:'verify otp successful'});
      }
    }
    catch(error){
      console.log('error qureying mongodDB:',error);
      res.status(500).json({message:'internal server error'});
    }
  
}