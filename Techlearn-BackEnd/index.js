if(process.env.NODE_NEV !== "production"){
    require('dotenv').config();
} 

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./Models/users'); // Adjust path as needed

// Create an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB

DB_URL = process.env.DB_URL  || 'mongodb://localhost:27017/TechLearn';
mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Initialize Passport
app.use(passport.initialize());

// JWT strategy for Passport
const SECRET_KEY = process.env.SECRET_KEY;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
  secretOrKey: SECRET_KEY, // Secret key for JWT validation
};

// Configure JWT strategy
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.userId);
      if (user) {
        return done(null, user); // User authenticated
      } else {
        return done(null, false); // User not found
      }
    } catch (error) {
      return done(error, false); // Error during authentication
    }
  })
);

// Local strategy for username/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use email as username
      passwordField: 'password', // Password field
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        return done(null, user); // Successful authentication
      } catch (error) {
        return done(error); // Error during authentication
      }
    }
  )
);

// Route setup
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
