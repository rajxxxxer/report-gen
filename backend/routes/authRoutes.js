const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const { jwtSecret } = require("../config/config");

const router = express.Router();

// Signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password });
  res.json({ message: "Signup successful" });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
