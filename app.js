// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

// Creating an Express application
const app = express();

// Importing the connectToMongoDB and closeMongoDBConnection functions
const { connectToMongoDB, closeMongoDBConnection } = require('./config/db');

let db; // Declare the db variable globally

async function run() {
  try {
    db = await connectToMongoDB(); // Establish the connection when the application starts
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Keep the application running
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if there's an error
  }
}

// Run the mongodb function
run().catch(console.error);

// Handle process exit to ensure proper cleanup
process.on('SIGINT', async () => {
  console.log("Received SIGINT signal. Closing MongoDB connection...");
  if (db) {
    await closeMongoDBConnection(); // Close the MongoDB connection when the application stops
  }
  process.exit(0); // Exit the process gracefully
});


// Middleware to parse the request body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the homepage
app.get('/', (req, res) => {
  // Sending 'Hello, World!' as the response
  res.send('<h1>Hello, World!</h1>');
});

// Routes
app.use('/auth', authRoutes);

// Starting the server
const port = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});