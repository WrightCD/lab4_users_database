const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");

// Get All
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Create
router.post("/", async (req, res) => {
  const user = new User(req.body);

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update
router.patch("/:id", getUser, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      res.user._id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", getUser, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(res.user);
    res.json({ message: `${deletedUser.username} has been deleted` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
