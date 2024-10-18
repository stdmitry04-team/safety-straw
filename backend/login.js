require("dotenv").config({ path: "./database.env" });
const { connectDB, connectClient } = require("./connect.js");
const crypto = require("crypto");

function generateRandomBase64(byteLength) {
  const randomBytes = crypto.randomBytes(byteLength);
  return randomBytes.toString("base64");
}

async function verifyLogin(user, pwd) {
  const client = await connectClient();
  const db = connectDB(client);
  const collection = db.collection(process.env.ALL_USERS_COLLECTION);

  const data = await collection.findOne({ username: user });
  console.log(data);
  if (data && data.password == pwd) {
    const genToken = generateRandomBase64(32);
    const result = await collection.updateOne(
      { username: user },
      { $set: { token: genToken } }
    );
    return genToken;
  }
  return "ERROR";
}

async function retrieveRole(collection, token) {
  const data = await collection.findOne({ token: token });
  if (data) {
    return data.roles;
  }

  return "ERROR";
}

module.exports = { verifyLogin, retrieveRole };
