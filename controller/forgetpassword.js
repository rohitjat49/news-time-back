const signup = require('../module/signup');
const bcrypt = require('bcrypt');
// Import the OTP controller

exports.forgotpassword = async (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
  // Assuming you're passing email in the request body

    // Validate input
    if (!newPassword || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'New password and confirm password do not match' });
    }

    try {
        // Fetch user from database
        const user = await signup.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

      
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await signup.updateOne({ email}, { $set: { password: hashedPassword } });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
