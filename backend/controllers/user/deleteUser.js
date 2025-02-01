const User = require('../../models/User_model');
const Note = require('../../models/Note_model'); // Assurez-vous d'importer le modèle des notes

const deleteUser = async (req, res) => {
  try {
    const authenticatedUserID = req.userID;
    const { userID } = req.params;

    const user = await User.findById(authenticatedUserID);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (authenticatedUserID.toString() !== userID) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this user',
      });
    }

    await Note.deleteMany({ user: userID });

    await User.findByIdAndDelete(userID);

    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });

    res
      .status(200)
      .json({ success: true, message: 'User and associated notes deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = deleteUser;
