const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });
const { connectDB, connectClient } = require("./connect.js");

async function updateEmailContents(header, content, subject) {
  const client = await connectClient();
  const db = connectDB(client);
  const collection = db.collection(process.env.NEWS_COLLECTION);

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
  console.log(result);
  client.close();
}

updateEmailContents(
  "test1",
  "this is a test for updating mongodb",
  "testingtest"
).catch(console.error);
