const connect = require("./connect.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {});
