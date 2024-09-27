const connect = require("./connect.js");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {});
