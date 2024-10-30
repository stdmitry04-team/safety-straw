const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./database.env" });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function connectClient() {
  const client = new MongoClient(process.env.ATLAS_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // Access your database
    return client;
    return client;
    // You can add more database operations here as needed
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function connectDB(client) {
  try {
    const database = client.db(process.env.DATABASE_NAME); // No specific database mentioned, defaults to the first one in the URI
    console.log(`Connected to database: ${database.databaseName}`);
    return database;
  } catch (e) {
    console.log("Failed to connect to the database...");
  }
}

module.exports = { connectClient, connectDB };
