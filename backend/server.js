const { connectClient, connectDB } = require("./connect.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

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
        const result = await collection.insertOne( {name: name, email: email} );
        res.status(200).json({message: 'Waitlist entry added successfully'});
    } catch (error) {
        console.log('Error inserting into waitlist:', error);
        res.status(500).json({ message: 'Failed to add entry to the waitlist'});
    }
});

app.listen(PORT, async () => {});
