const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function run() {
  console.log(process.env.ATLAS_URI);
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
    const database = client.db(); // No specific database mentioned, defaults to the first one in the URI
    console.log(`Connected to database: ${database.databaseName}`);
    // You can add more database operations here as needed
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Close the client connection
    await client.close();
  }
}

run().catch(console.error);
