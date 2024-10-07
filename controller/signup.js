const signup=require('../module/signup')
const bcrypt = require('bcrypt');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid')
//signup api 
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the email already exists
        const existingUser = await signup.findOne({ email });

        if (existingUser) {
            // User with the same email already exists
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Your existing validation code...

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        const newUser = new signup({
            _id: userId,
            email,
            password: hashedPassword,
        });

        const result = await newUser.save();
        res.json({ message: 'Signup successful' });

    } catch (err) {
        console.error('Error saving user to database:', err);
        res.status(500).json({ error: 'Error saving user to database' });
    }
};

