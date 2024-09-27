# Safety Straw Website

## Startup Guide

### Node.JS

- Please install Node.js
- You can check if you've installed it correctly by running "node -v" in your terminal to check your version status

### Backend

- For those who believe they're going to be developing in the backend, please create a MongoDB Atlas Account
- install NodeJs
- cd into the 'backend' folder
- run "npm install" in the terminal if you  are running it first time
- Create config.env file inside of the backend folder
- Copy insides of config.env.example to config.env and put your variables there. For port, use 5000
- To start the local host, run "npm run dev" in the terminal


### Frontend

 - cd into 'frontend'
 - Create .env file inside of the backend folder
 - Copy insides of .env.example to .env and put your variables there. For PORT, use 3000; For REACT_APP_BACKEND_URL, use http://localhost:5000

### How to Run Local Host

- cd into the 'frontend' folder
- If this your first time running the application, run "npm install" in the terminal
- To start the local host, run "npm run dev" in the terminal
