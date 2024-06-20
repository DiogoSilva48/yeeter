// Importing required modules
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const middlewareRoutes = require('./routes/middlewareRoutes');
const yeetRoutes = require('./routes/yeetRoutes');
const userRoutes = require('./routes/userRoutes');

const passport = require('./config/passport');

// Creating an Express application
const app = express();

// Importing the connectToMongoDB and closeMongoDBConnection functions
const { connectToMongoDB, closeMongoDBConnection } = require('./config/db');

let db; // Declare the db variable globally

async function run() {
  try {
    db = await connectToMongoDB(); // Establish the connection when the application starts
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
    // Keep the application running
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if there's an error
  }
}

// Configure express-session middleware
app.use(
  session({
    secret: 'goodmorningboatarde',
    resave: false,
    saveUninitialized: false,
    name: 'yeeterCookie',
    cookie: {
      secure: false, // Set to true in production
      httpOnly: false, // Prevent client-side JavaScript access
      maxAge: 3600000, // Expire cookie after one hour
      path: '/',
      domain: 'localhost',
    },
  })
);

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse the request body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Run the mongodb function
run().catch(console.error);

// Handle process exit to ensure proper cleanup
process.on('SIGINT', async () => {
  console.log('Received SIGINT signal. Closing MongoDB connection...');
  if (db) {
    await closeMongoDBConnection(); // Close the MongoDB connection when the application stops
  }
  process.exit(0); // Exit the process gracefully
});

// Route for the homepage
app.get('/', (req, res) => {
  // Sending 'Hello, World!' as the response
  res.send('<h1>Hello, World!</h1>');
});

// Allow requests from all origins with appropriate headers
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from localhost:3000
    credentials: true,
    exposedHeaders: ['Content-Type', 'Authorization'], // Add your custom headers here
  })
);

// Routes
app.use('/auth', authRoutes);
app.use('/', middlewareRoutes);
app.use('/yeet', yeetRoutes);
app.use('/user', userRoutes);

// Starting the server
const port = process.env.PORT || 4000; // Use the port provided by the environment or default to 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
