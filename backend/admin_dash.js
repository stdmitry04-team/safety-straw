const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./database.env" });
const { connectDB, connectClient } = require("./connect.js");

async function updateEmailContents(header, content, subject) {
<<<<<<< HEAD
  const client = await connectClient();
  const db = connectDB(client);
  const collection = db.collection(process.env.NEWS_COLLECTION);
  const filter = { name: process.env.MAIN_NEWSLETTER };

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
=======
  try {
    const client = await connectClient();
    const db = connectDB(client);
    const collection = db.collection(process.env.NEWS_COLLECTION);
    const filter = { name: process.env.MAIN_NEWSLETTER };
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
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
}

module.exports = { updateEmailContents };
