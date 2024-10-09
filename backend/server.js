const { connectClient, connectDB } = require("./connect.js");
const express = require("express");
const cors = require("cors");
const { updateEmailContents } = require("./admin_dash.js");
const { fetchNewsLetterContent } = require("./mailer.js");
const { connectDB, connectClient } = require("./connect.js");
require("dotenv").config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/waitlist", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Email format is incorrect" });
  }

  try {
    const client = await connectClient();
    const db = connectDB(client);
    const collection = db.collection("waitlist");
    const result = await collection.insertOne({ name: name, email: email });
    res.status(200).json({ message: "Waitlist entry added successfully" });
  } catch (error) {
    console.log("Error inserting into waitlist:", error);
    res.status(500).json({ message: "Failed to add entry to the waitlist" });
  }
});
//need to figure out some kind of authentication, security key into db that
//becomes a cookie?
app.post("/api/update", async (req, res) => {
  const { subject, header, content } = req.body;

  if (!subject || !header || !content) {
    return res
      .status(400)
      .json({ message: "Subject, header, or content is missing" });
  }

  try {
    const result = updateEmailContents(header, content, subject);
    res.status(200).json({ message: "Waitlist entry added successfully" });
  } catch (e) {
    console.log("Error updating the newsletter:", e);
    res.status(500).json({ message: "Failed to update the newsletter" });
  }
});

//need to figure out some kind of authentication
app.get("/api/get-newsletter", async (req, res) => {
  const client = await connectClient();
  const db = connectDB(client);
  const data = await fetchNewsLetterContent(db);
  res.send(data[0]);
  client.close();
});

app.listen(PORT, async () => {});
