const express = require('express');

const verifyToken = require('../middlewares/verifyToken');
const authController = require('../controllers/user/index');

const userRouter = express.Router();

userRouter.get('/check-auth', verifyToken, authController.checkAuth);

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/logout', authController.logout);

module.exports = userRouter;
