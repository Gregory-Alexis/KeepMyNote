const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');

const connectDB = require('./db/connectDB');

const userRouter = require('./routes/auth_routes');
const noteRouter = require('./routes/note_routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRouter);
app.use('/api/notes', noteRouter);

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port: ', PORT);
});
