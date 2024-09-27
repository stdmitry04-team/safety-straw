# Safety Straw Website

## Startup Guide

### Node.JS

- Please visit the following link and install Node.js
- You can check if you've installed it correctly by running "node -v" in your terminal to check your version status

### Backend

- For those who believe they're going to be developing in the backend, please create a MongoDB Atlas Account
- cd into the 'backend' folder
- Run in the terminal "npm install mongodb"
- Run in the terminal "npm install dotenv"
- If you don't have one already, make a 'config.env' file in the backend folder
- In the config file, add ATLAS_URI = mongodb+srv://\<db_username\>:\<db_password>\@safetystraw.lfyxk.mongodb.net/?retryWrites=true&w=majority&appName=SafetyStraw
- In config.env, replace db_password and db_username with the correct credentials. Reach out to Bryan or Dmitri to get this information.

### How to Run Local Host

- cd into the 'frontend' folder
- If this your first time running the application, run "npm install" in the terminal
- To start the local host, run "npm run dev" in the terminal
