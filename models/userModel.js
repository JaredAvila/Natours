const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must enter a name'],
    trim: true,
    maxlength: [40, 'Name must be less than 40 characters'],
    minlength: [2, 'Name must be more than 2 characters'],
    validate: [validator.isAlpha, 'Name can only contain letters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Must be a valid email address']
  },
  photo: {
    type: String,
    required: [true, 'Must have a photo']
  },
  password: {
    type: String,
    required: [true, 'Must enter a password'],
    minlength: [8, 'Password must be at least 6 characters long']
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'Please confirm your password']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
