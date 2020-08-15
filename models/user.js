//require mongoose for the database mongodb
const mongoose = require('mongoose');

//require validator to validate the email or more
const validator = require('validator');

//prepare schema for put the information in database
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: validator.isEmail,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
