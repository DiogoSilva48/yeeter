// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');
const { uri } = require('./dbconfig');

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function closeMongoDBConnection() {
  try {
    await client.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
  closeMongoDBConnection
};
