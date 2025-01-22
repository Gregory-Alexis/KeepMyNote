const cookieParser = require('cookie-parser');
const express = require('express');

const connectDB = require('./db/connectDB');

const userRouter = require('./routes/auth_routes');
const noteRouter = require('./routes/note_routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use('/api', userRouter, noteRouter);

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port: ', PORT);
});
