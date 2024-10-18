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
require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./database.env" });

const app = express();
const PORT = process.env.PORT || 5000;

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
  console.log(token);
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
  console.log(user, pwd);
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

app.listen(PORT, async () => {});
