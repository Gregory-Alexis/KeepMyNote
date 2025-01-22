const Note = require('../../models/Note_model');
const User = require('../../models/User_model');

const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userID = req.userID;

  try {
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const note = await Note.create({
      title,
      content,
      user: userID,
    });

    user.notes.push(note._id);

    await user.save();

    res.status(201).json({ success: true, message: 'Note created successfully', note });
  } catch (error) {
    console.error('Error in createNote:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createNote;
