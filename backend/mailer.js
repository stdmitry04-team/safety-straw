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
    html: "<b>Hello world?</b>",
  });
}

main().catch(console.error);
