require("dotenv").config({ path: "./database.env" });
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const { updateEmailContents } = require("./admin_dash.js");
const { verifyLogin, retrieveRole } = require("./login.js");
const {
  fetchNewsLetterContent,
  sendNewsLetter,
  scheduleMail,
} = require("./mailer.js");
const { connectDB, connectClient } = require("./connect.js");
const path = require('path');
const app = express();
const PORT = process.env.API_PORT || 5000; // Make sure PORT is defined here
const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

const crypto = require("crypto");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());

app.use(cors());
app.use(express.json());

async function verifyAdmin(token) {
  const client = await connectClient();
  const db = connectDB(client);
  const collection = db.collection(process.env.ALL_USERS_COLLECTION);
  const role = await retrieveRole(collection, token);
  return role == "Admin";
}

app.post("/api/update", async (req, res) => {
  const { subject, header, content, token } = req.body;

  if (verifyAdmin(token)) {
    if (!subject || !header || !content) {
      return res
        .status(400)
        .json({ message: "Subject, header, or content is missing" });
    }
    try {
      const result = await updateEmailContents(header, content, subject);
      res.status(200).json({ message: "Waitlist entry added successfully" });
    } catch (e) {
      console.log("Error updating the newsletter:", e);
      res.status(500).json({ message: "Failed to update the newsletter" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized action" });
  }
});

//need to figure out some kind of authentication
app.get("/api/get-newsletter", async (req, res) => {
  const token = req.query.token;
  if (verifyAdmin(token)) {
    const client = await connectClient();
    const db = connectDB(client);
    const data = await fetchNewsLetterContent(db);
    client.close();
    res.send(data);
  } else {
    res.status(401).json({ message: "Unauthorized action" });
  }
});

app.get("/api/get-recipients", async (req, res) => {
  const token = req.query.token;
  if (verifyAdmin(token)) {
    const client = await connectClient();
    const db = connectDB(client);
    const waitlistCollection = db.collection(process.env.WAITLIST_COLLECTION);
    const emails = await waitlistCollection.find({}).toArray();
    let recipients = emails.map((item) => item.email).join(", ");
    client.close();
    res.json(recipients);
  } else {
    res.status(401).json({ message: "Unauthorized action" });
  }
});

app.post("/api/send-mail", async (req, res) => {
  const { token } = req.body;
  if (verifyAdmin(token)) {
    await sendNewsLetter(token);
  } else {
    res.status(401).json({ message: "Unauthorized action" });
  }
});

app.post("/api/schedule-mail", async (req, res) => {
  const { date, token } = req.body;
  if (verifyAdmin(token)) {
    await scheduleMail(date);
  } else {
    res.status(401).json({ message: "Unauthorized action" });
  }
});

app.post("/api/verify-login", async (req, res) => {
  const { user, pwd } = req.body;
  res.json({ token: await verifyLogin(user, pwd) });
});

app.get("/api/get-role", async (req, res) => {
  const client = await connectClient();
  const db = connectDB(client);
  const collection = db.collection(process.env.ALL_USERS_COLLECTION);
  const token = req.query.token;
  const role = await retrieveRole(collection, token);
  if (token) {
    res.json({ result: role });
  } else {
    res.status(400);
  }
});

app.post("/api/waitlist", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res
      .status(400)
      .json({ message: "Oops! That doesn't look like a valid email address" });
  }

  try {
    const client = await connectClient();
    const db = connectDB(client);
    const collection = db.collection("waitlist");

    const token = crypto.randomBytes(32).toString("hex");

    await collection.insertOne({
      name: name,
      email: email,
      token: token,
      confirm: false,
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USR,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `${baseUrl}/api/waitlist/confirm?token=${token}`;
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Safety Straw Waitlist Email Verification",
      html: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
    };

    transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Please check your inbox and verify your email!" });
  } catch (error) {
    console.log("Error inserting into waitlist:", error);
    res.status(500).json({ message: "Failed to add entry to the waitlist" });
  }
});

app.get("/api/waitlist/confirm", async (req, res) => {
  const token = req.query.token;
  try {
    const client = await connectClient();
    const db = connectDB(client);
    const collection = db.collection("waitlist");
    const updateData = { confirm: true };
    const user = await collection.updateOne(
      { token: token },
      { $set: updateData }
    );
  } catch (error) {
    console.log("Error finding user:", error);
    res.status(500).json({ message: "Failed to find user" });
  }
  res.status(200).send("Your email has been successfully verified!");
});

// Serve static files from the public directory (serves the built react files in deployment)
app.use(express.static("public"));

//Handle React routing, return all other requests to React app
app.get("*", (req, res) => {
  // exclude all routes that begin with '/api/', those will be handled by express.js
  if (!req.path.startsWith("/api/")) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  }
});

app.listen(PORT, async () => {});
