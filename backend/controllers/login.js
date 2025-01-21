const { get } = require('mongoose');
const User = require('../models/User_model');
const bcrypt = require('bcrypt');
const generateTokenAndSetCookie = require('../utils/generateAndSetCookie');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    generateTokenAndSetCookie(req, user._id);

    await user.save;

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: { ...user._doc, password: null },
    });
  } catch (error) {
    console.log('Error in login', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = login;
