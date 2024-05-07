const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profilePicture: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  contact: {
    type: String,
    validate: {
      validator: (v) => /\d{3}-\d{3}-\d{4}/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

// Hash the password before saving
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next(); // If password hasn't changed, continue
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return next(err); // Handle salt generation error
    }

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err); // Handle hashing error
      }
      this.password = hash; // Store the hashed password
      next(); // Proceed with the save operation
    });
  });
});

// Method to compare a plain text password with the hashed one
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Returns true if match
};

module.exports = mongoose.model('User', userSchema);
