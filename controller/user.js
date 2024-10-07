const user = require('../module/user');
const { v4: uuidv4 } = require('uuid');

exports.noti = async (req, res) => {
  try {
    const userId = uuidv4();
    const newUser = new user({
      _id: userId
    });
    await newUser.save();
    res.json({ message: 'This user allows notifications' });
  } catch (err) {
    console.error('Error saving user to database', err);
    res.status(500).json({ error: 'Error saving user to database' });
  }
};
