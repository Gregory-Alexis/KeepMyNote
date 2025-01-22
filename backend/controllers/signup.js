const bcrypt = require('bcrypt');

const User = require('../models/User_model');
const generateAndSetCookie = require('../utils/generateAndSetCookie');

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ success: false, message: 'All field are required' });
      return;
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      res.status(400).json({ success: false, message: 'That user already exist' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    generateAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = signup;
