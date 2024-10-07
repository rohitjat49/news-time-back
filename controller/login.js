const express = require("express");
const Router = express.Router();
const signup=require('../module/signup');
const jwtmodule=require('../module/jwtmodule');
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user in MongoDB
        const user = await signup.findOne({ email});

        // Check if the user exists
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log("password not match");
            return res.status(401).json({ error: 'Authentication failed' });
        }

const token=jwtmodule.generateToken({email});

        console.log("Login successful",token);
        res.status(200).json({ message: 'Login successful',token});
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Login failed' });
    }
};
