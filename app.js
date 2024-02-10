// Importing required modules
const express = require('express');

// Creating an Express application
const app = express();

// Route for the homepage
app.get('/', (req, res) => {
  // Sending 'Hello, World!' as the response
  res.send('<h1>Hello, World!</h1>');
});

// Starting the server
const port = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});