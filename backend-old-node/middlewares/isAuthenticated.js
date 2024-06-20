const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated based on session
  if (req.isAuthenticated() && req.user) {
    // If authenticated and user object exists in session, allow the request to proceed
    return next();
  } else {
    // If not authenticated or user object does not exist, return an error response or redirect to login
    return res.redirect('http://localhost:3000/login'); // Redirect to login page
  }
};

module.exports = isAuthenticated;
