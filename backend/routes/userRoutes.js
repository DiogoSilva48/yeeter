const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const isAuthenticated = require('../middlewares/isAuthenticated.js');

// Other routes and middleware definitions

// Route to list all users
router.get('/users', UserController.listUsers);
router.get('/user', isAuthenticated, UserController.listLoggedInUser);

// Other routes and middleware definitions

module.exports = router;
