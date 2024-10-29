require("dotenv").config({ path: "./database.env" });

require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 5000; // Make sure PORT is defined here
const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
console.log(baseUrl);
