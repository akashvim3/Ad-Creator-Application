const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password, company } = req.body;

    // Mock database check
    if (email === 'existing@test.com') {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Mock user creation
    const user = {
      _id: 'mock-user-id',
      firstName,
      lastName,
      email,
      company,
      role: 'user',
      stats: {
        lastLogin: new Date(),
        createdAt: new Date()
      }
    };

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Mock user lookup
    if (email !== 'test@example.com' || password !== 'password123') {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Mock user
    const user = {
      _id: 'mock-user-id',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      company: 'Test Company',
      role: 'user',
      subscription: {
        plan: 'free',
        isActive: true
      },
      stats: {
        lastLogin: new Date()
      }
    };

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
        role: user.role,
        subscription: user.subscription
      }
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    // Mock user data for testing
    const user = {
      _id: req.user.id,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      company: 'Test Company',
      role: 'user',
      subscription: {
        plan: 'free',
        startDate: new Date(),
        isActive: true
      },
      profile: {
        avatar: null,
        bio: 'Test user bio',
        phone: '+1234567890',
        website: 'https://example.com',
        socialLinks: {
          twitter: '@testuser',
          linkedin: '/in/testuser',
          facebook: '/testuser'
        }
      },
      preferences: {
        theme: 'auto',
        notifications: {
          email: true,
          push: true
        },
        language: 'en'
      },
      stats: {
        adsCreated: 5,
        totalSpent: 100,
        lastLogin: new Date(),
        createdAt: new Date('2026-01-01')
      }
    };

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.comparePassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      token
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with that email'
      });
    }

    // TODO: Implement password reset token generation and email sending
    // This would involve generating a reset token, setting expiry, and sending email
    
    res.status(200).json({
      success: true,
      message: 'Password reset instructions sent to your email'
    });
  } catch (error) {
    next(error);
  }
};

// Validation rules
exports.signupValidation = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('company')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters')
];

exports.loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

exports.passwordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
];