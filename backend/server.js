const connect = require("./connect.js");
const express = require("express");
const cors = require("cors");
const { updateEmailContents } = require("./admin_dash.js");
require("dotenv").config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, async () => {});
