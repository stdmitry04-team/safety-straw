const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });
const { MongoClient, ServerApiVersion } = require("mongodb");
const { connectDB } = require("./connect.js");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //define mailer service, this one is gmail
  port: 587, //default port?
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USR,
    pass: process.env.EMAIL_PASS, //email needs a "app password" which is created in the gmail settings
  },
});

async function main() {
  const db = await connectDB();
  const waitlistCollection = db.collection("waitlist");
  const emails = await waitlistCollection.find({}).toArray();
  let recipients = emails.map((item) => item.email).join(", ");

  const info = await transporter.sendMail({
    from: '"Bryan Tran" <Btran21003@gmail.com>',
    to: recipients,
    subject: "Hello ✔",
    html: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .email-header {
        text-align: center;
      }
      body {
        background-image: linear-gradient(#f7c170, #df614b);
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
    <h1 class="email-header">This is the email header</h1>
    <div class="content-container">
      <img
        src="logo"
        class="company-logo"
      />
      <p>
        This is dummy text. This is dummy text. This is dummy text. This is
        dummy text. This is dummy text. This is dummy text. This is dummy text.
        This is dummy text. This is dummy text. This is dummy text. This is
        dummy text. This is dummy text. This is dummy text. This is dummy text.
        This is dummy text. This is dummy text. This is dummy text. This is
        dummy text. This is dummy text. This is dummy text. This is dummy text.
        This is dummy text. This is dummy text. This is dummy text. This is
        dummy text. This is dummy text. This is dummy text. This is dummy text.
        This is dummy text. This is dummy text. This is dummy text. This is
        dummy text. This is dummy text. This is dummy text. This is dummy text.
        This is dummy text. This is dummy text. This is dummy text. This is
        dummy text. This is dummy text. This is dummy text. This is dummy text.
        This is dummy text. This is dummy text. This is dummy text. This is
        dummy text. This is dummy text. This is dummy text. This is dummy text.
        This is dummy text. This is dummy text. This is dummy text. This is
        dummy text. This is dummy text. This is dummy text. This is dummy text.
        This is dummy text. This is dummy text. This is dummy text. This is
        dummy text. This is dummy text. This is dummy text. This is dummy text.
      </p>
    </div>
    <footer>
      <p>This is the footer</p>
    </footer>
  </body>
</html>
`,
    attachments: [
      {
        filename: "safety-straw-logo.png",
        path: "../frontend/src/assets/safety-straw-logo.png",
        cid: "logo",
      },
    ],
  });
}

main().catch(console.error);
