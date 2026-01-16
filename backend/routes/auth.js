const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  signup,
  login,
  logout,
  getMe,
  updatePassword,
  forgotPassword,
  signupValidation,
  loginValidation,
  passwordValidation
} = require('../controllers/authController');

router.route('/signup').post(signupValidation, signup);
router.route('/login').post(loginValidation, login);
router.route('/logout').post(logout);
router.route('/me').get(protect, getMe);
router.route('/updatepassword').put(protect, passwordValidation, updatePassword);
router.route('/forgotpassword').post(forgotPassword);

module.exports = router;