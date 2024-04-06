const User = require('../models/user.js');

// List all users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// List the currently logged-in user
exports.listLoggedInUser = async (req, res) => {
  try {
    const loggedInUser = req.user;
    res.status(200).json(loggedInUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
