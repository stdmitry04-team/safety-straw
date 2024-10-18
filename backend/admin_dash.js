const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./database.env" });
const { connectDB, connectClient } = require("./connect.js");

async function updateEmailContents(header, content, subject) {
  try {
    const client = await connectClient();
    const db = connectDB(client);
    const collection = db.collection(process.env.NEWS_COLLECTION);
    const filter = { name: process.env.MAIN_NEWSLETTER };
    console.log(collection);
    const updateDoc = {
      $set: {
        header: header,
        content: content,
        subject: subject,
      },
    };

    const result = await collection.updateOne(filter, updateDoc);
    client.close();
    return result;
  } catch (e) {
    console.log("Failed to update newsletter:", e);
  }
}

module.exports = { updateEmailContents };
