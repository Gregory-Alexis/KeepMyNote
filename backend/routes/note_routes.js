const express = require('express');

const NoteController = require('../controllers/note/index');
const verifyToken = require('../middlewares/verifyToken');

const noteRouter = express.Router();

noteRouter.get('/', NoteController.getNotes);
noteRouter.post('/create', verifyToken, NoteController.createNote);
noteRouter.delete('/delete/:noteID', verifyToken, NoteController.deleteNote);
noteRouter.put('/update/:noteID', verifyToken, NoteController.updateNote);

module.exports = noteRouter;
