// backend/middleware/isAuthenticated.js

const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If authenticated, allow the request to proceed
    return next();
  } else {
    // If not authenticated, return an error response or redirect to login
    return res.redirect('http://localhost:3000/login'); // Redirect to login page
  }
};

module.exports = isAuthenticated;
