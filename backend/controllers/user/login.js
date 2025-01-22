const bcrypt = require('bcrypt');

const User = require('../../models/User_model');
const generateTokenAndSetCookie = require('../../utils/generateAndSetCookie');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log('Error in login', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = login;
