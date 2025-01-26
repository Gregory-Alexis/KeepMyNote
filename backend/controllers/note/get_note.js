const Note = require('../../models/Note_model');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getNotes;
