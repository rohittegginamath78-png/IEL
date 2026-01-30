const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }
    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res.status(410).json({ message: "user exists please login" });
    }
    const hashedpass = await bcrypt.hash(password, 11);

    const user = await User.create({
      name,
      email,
      password: hashedpass,
    });

    res.status(202).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: "Invalid crenditials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
