const Note = require('../../models/Note_model');
const mongoose = require('mongoose');

const deleteNote = async (req, res) => {
  const { noteID } = req.params;
  console.log(req.params.noteID);
  try {
    const note = await Note.findByIdAndDelete(noteID);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    return res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = deleteNote;
