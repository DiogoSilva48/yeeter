// db.js
const mongoose = require('mongoose');

//Allow .env files to be loaded
require('dotenv').config();
const uri = process.env.DB_URI;

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    console.log('Connected to MongoDB!');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function closeMongoDBConnection() {
  try {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
  closeMongoDBConnection,
};
