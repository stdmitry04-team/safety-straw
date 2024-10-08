const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });
const { connectDB, connectClient } = require("./connect.js");

async function updateEmailContents(header, content, subject) {
  const client = await connectClient();
  const db = connectDB(client);
  const collection = db.collection(process.env.NEWS_COLLECTION);
  console.log(header, content, subject);
  const filter = { name: process.env.MAIN_NEWSLETTER };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      header: header,
      content: content,
      subject: subject,
    },
  };

  const result = await collection.updateOne(filter, updateDoc, options);
  client.close();
  return result;
}

module.exports = { updateEmailContents };
