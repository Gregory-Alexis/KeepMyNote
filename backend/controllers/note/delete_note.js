const Note = require('../../models/Note_model');

const deleteNote = async (req, res) => {
  const { noteID } = req.params;
  const userID = req.userID;

  try {
    const note = await Note.findById(noteID);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    if (note.user.toString() !== userID) {
      return res
        .status(403)
        .json({ success: false, message: 'You do not have permission to delete this note' });
    }

    await Note.findByIdAndDelete(noteID);

    return res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = deleteNote;
