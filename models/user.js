const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  city: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/,
  },
  website: {
    type: String,
    required: true,
    match: /^(http|https):\/\/\S+$/,
  },
  zipCode: {
    type: String,
    required: true,
    match: /^\d{5}-\d{4}$/,
  },
  phone: {
    type: String,
    required: true,
    match: /^\d-\d{3}-\d{3}-\d{4}$/,
  },
});

module.exports = mongoose.model("User", userSchema);