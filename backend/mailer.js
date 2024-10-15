const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./database.env" });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //define mailer service, this one is gmail
  port: 587, //default port?
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USR,
    pass: process.env.EMAIL_PASS, //email needs a "app password" which is created in the gmail settings
  },
});

async function scheduleMail(date) {
  console.log(new Date(date));
  console.log(date);
  schedule.scheduleJob(new Date(date), async () => {
    // This runs every minute
    console.log("Scheduled mail");
    await sendNewsLetter();
  });
}

async function sendNewsLetter() {
  let response = await fetch("http://localhost:5000/api/get-recipients", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  let recipients = await response.json();

  response = await fetch("http://localhost:5000/api/get-newsletter", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  let newsletter_content = await response.json();

  const info = await transporter.sendMail({
    from: `${process.env.MAILING_EMAIL}`,
    to: recipients,
    subject: newsletter_content[0][0],
    html: newsletter_content[1],
    attachments: [newsletter_content[2]],
  });
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

module.exports = { fetchNewsLetterContent, sendNewsLetter, scheduleMail };
