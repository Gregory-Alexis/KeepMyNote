const Note = require('../../models/Note_model');

const updateNote = async (req, res) => {
  const { noteID } = req.params;
  const userID = req.userID;
  const { title, content } = req.body;

  if (!userID) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    const note = await Note.findById(noteID);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    if (note.user.toString() !== userID) {
      return res
        .status(403)
        .json({ success: false, message: 'You do not have permission to update this note' });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();

    res.status(200).json({ success: true, message: 'Note updated successfully', note });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateNote;
