const cookieParser = require('cookie-parser');
const express = require('express');
const connectDB = require('./db/connectDB');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.listen(() => {
  connectDB();
  console.log('Server is running on port: ', PORT);
});
