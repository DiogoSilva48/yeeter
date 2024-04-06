const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { fullName, username, password, email, dateOfBirth, country } =
      req.body;
    console.log(req.body);
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      email,
      dateOfBirth,
      country,
    });

    // Save the user to the database
    await newUser.save();
    console.log(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login with username and password
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
};

// Logout function
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('yeeterCookie');
    res.status(200).json({ message: 'Logout successful' });
  });
};
