const { connectClient, connectDB } = require("./connect.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5000;  //in deployment process.env.PORT should be 3000
const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

const crypto = require('crypto');
const nodemailer = require('nodemailer');

app.use(cors());
app.use(express.json());


app.post('/api/waitlist', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Oops! That doesn\'t look like a valid email address' });
    }

    try {
        const client = await connectClient();
        const db = connectDB(client);
        const collection = db.collection('waitlist');

        const token = crypto.randomBytes(32).toString('hex');

        await collection.insertOne( {name: name, email: email, token: token, confirm: false } );

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USR,
                pass: process.env.EMAIL_PASS,
            }
        });

        const verificationLink = `${baseUrl}/api/waitlist/confirm?token=${token}`;
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Safety Straw Waitlist Email Verification',
            html: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`
        };

        transporter.sendMail(mailOptions);

        res.status(200).json({message: 'Please check your inbox and verify your email!'});
    } catch (error) {
        console.log('Error inserting into waitlist:', error);
        res.status(500).json({ message: 'Failed to add entry to the waitlist'});
    }
});

app.get('/api/waitlist/confirm', async (req, res) => {
    const token = req.query.token;
    try {
        const client = await connectClient();
        const db = connectDB(client);
        const collection = db.collection('waitlist');
        const updateData = { confirm: true };
        const user = await collection.updateOne({token: token}, {$set: updateData});
    }
    catch (error) {
        console.log('Error finding user:', error);
        res.status(500).json({ message: 'Failed to find user'});
    }
    res.status(200).send('Your email has been successfully verified!');
})

// Serve static files from the public directory (serves the built react files in deployment)
app.use(express.static('public'));

// Handle React routing, return all other requests to React app
app.get('*', (req, res) => {
    // exclude all routes that begin with '/api/', those will be handled by express.js
    if (!req.path.startsWith('/api/')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});


app.listen(PORT, async () => {});
