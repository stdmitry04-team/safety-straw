const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./database.env" });
<<<<<<< HEAD
const { connectDB, connectClient } = require("./connect.js");
=======
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //define mailer service, this one is gmail
  port: 587, //default port?
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USR,
    pass: process.env.EMAIL_PASS, //email needs a "app password" which is created in the gmail settings
  },
});
<<<<<<< HEAD

async function main() {
  await sendNewsLetter();
}

/**
 * Main driver function to send emails
 */
async function sendNewsLetter() {
  const client = await connectClient();
  const db = connectDB(client);
  const waitlistCollection = db.collection(process.env.WAITLIST_COLLECTION);
  const emails = await waitlistCollection.find({}).toArray();
  let recipients = emails.map((item) => item.email).join(", ");
  const newsletter_content = await fetchNewsLetterContent(db);
=======
const PORT = process.env.API_PORT || 5000; // Make sure PORT is defined here
const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

async function scheduleMail(date) {
  schedule.scheduleJob(new Date(date), async () => {
    // This runs every minute
    console.log("Scheduled mail");
    await sendNewsLetter();
  });
}

async function sendNewsLetter(token) {
  let response = await fetch(`${baseUrl}/api/get-recipients?token=${token}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  let recipients = await response.json();
  response = await fetch(`${baseUrl}/api/get-newsletter`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  let newsletter_content = await response.json();
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f

  const info = await transporter.sendMail({
    from: `${process.env.MAILING_EMAIL}`,
    to: recipients,
    subject: newsletter_content[0][0],
    html: newsletter_content[1],
    attachments: [newsletter_content[2]],
  });
<<<<<<< HEAD

  client.close();
=======
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
}

/**
 * Collects the necessary information from the database and returns
 * information necessary to send the newsletter
 * @param {Db} db
 * @returns
 */
async function fetchNewsLetterContent(db) {
  const collection = db.collection(process.env.NEWS_COLLECTION);
  const data = await collection.findOne({ name: process.env.MAIN_NEWSLETTER });
  let content = `<!DOCTYPE html>
<html>
  <head>
    <style>
      .email-header {
        text-align: center;
      }
      body {
        background-color: #ff7e5f; /* Fallback for older clients */
        background: linear-gradient(#f7c170, #df614b);
        height: 100vh;
      }
      .content-container {
        margin: 5vh 15vw 5vh 15vw;
      }
      .company-logo {
        float: right;
        width: 5rem;
        padding: 1rem 2rem 1rem 1rem;
      }
      footer {
        text-align: center;
        margin: 5vh 15vw 5vh 15vw;
      }
    </style>
  </head>
  <body>
    <h1 class="email-header">${data["header"]}</h1>
    <div class="content-container">
      <img
        src="cid:logo"
        class="company-logo"
      />
      <p>
        ${data["content"]}
      </p>
    </div>
    <footer>
      <p>This is the footer</p>
    </footer>
  </body>
</html>
`;

  return [
    [data["subject"], data["header"], data["content"]],
    content,
    {
      filename: "safety-straw-logo.png",
      path: "../frontend/src/assets/safety-straw-logo.png",
      cid: "logo",
    },
  ];
}

<<<<<<< HEAD
// schedule.scheduleJob("* * * * *", () => {
//   // This runs every minute
//   console.log("Running job every minute.");
//   main();
// });

module.exports = { fetchNewsLetterContent };
=======
module.exports = { fetchNewsLetterContent, sendNewsLetter, scheduleMail };
>>>>>>> a9e5dc1b0e67f6ad170607d6e5c1ad2ce212d42f
