const express = require('express');
const router = express.Router();
const User = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const ensureOwnProfile = require('../Middleware/ensureOwnProfile');


// Register a new user
router.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password must be the same!' });
    }

    // Create a new user
    const newUser = new User({
      email,
      password,
    });

    await newUser.save(); // Password is hashed before saving
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

const SECRET_KEY = process.env.SECRET_KEY || 'yourSecretKey';

// Login and generate a JWT
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  // Generate JWT token upon successful authentication
  const token = jwt.sign(
    { userId: req.user._id, email: req.user.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login successful', token }); // Return token
});


// Logout route (JWT-based apps generally don't use sessions for logout)
router.get('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Protected route to get the current user's profile
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    userId: req.user._id,
    email: req.user.email,
    name: req.user.name,
  });
});

// Get a specific user by ID (JWT-protected)
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a user's information (JWT-protected, only by the user)
router.put('/:id', [passport.authenticate('jwt', { session: false }), ensureOwnProfile], async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
