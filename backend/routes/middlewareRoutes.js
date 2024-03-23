const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');

// Protected route
router.get('/protected', isAuthenticated, (req, res) => {
  // If the middleware allowed the request to proceed,
  // it means the user is authenticated
  res.json({ message: 'You are authenticated!' });
});

// Check authentication status
router.get('/check-auth', isAuthenticated, (req, res) => {
  // If the middleware allowed the request to proceed,
  // it means the user is authenticated
  res.sendStatus(200);
});

module.exports = router;
