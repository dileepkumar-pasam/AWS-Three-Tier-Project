🌐 3-Tier Application Deployment on AWS

This repository demonstrates the deployment of a 3-tier application on AWS Cloud. The application includes the following layers:

    Presentation Layer: Frontend (React)

    Application Layer: Backend (Node.js)

    Data Layer: MySQL (Local or AWS RDS)

📚 Tech Stack

    Frontend: React.js

    Backend: Node.js

    Database: MySQL

🖥️ Frontend Setup (React)

    Make sure Node.js is installed on your system. Download Node.js

1. Install Dependencies

cd client
npm install

2. Configure Backend API

Update the API URL used by the frontend:

vim src/pages/config.js

Replace with your actual backend server IP or localhost:

// const API_BASE_URL = "http://25.41.26.237:80"; // for production
const API_BASE_URL = "http://localhost:8800"; // for local development
export default API_BASE_URL;

3. Build the React App

npm run build

    This will generate a production-ready version of your app in the client/build/ directory.
    You can serve these files using Nginx, Apache, or any static web server.

🛠️ Backend Setup (Node.js)

    Ensure Node.js is installed: Download Node.js

1. Install Dependencies

cd backend
npm install

2. Create Environment Variables File

In the backend directory, create a .env file:

vim .env

Paste the following content:

PORT=8800
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=       # Leave blank if no password
DB_NAME=3-tier-project
DB_PORT=3308

    Adjust the values depending on your local setup or AWS RDS configuration.

3. Create the Database

Start MySQL (locally or via RDS), then execute:

mysql -h localhost -u root -P 3308 -p

Inside the MySQL shell:

CREATE DATABASE `3-tier-project`;
USE `3-tier-project`;

Import the schema:

mysql -h localhost -u root -P 3308 -p 3-tier-project < test.sql

    test.sql should include the creation of the books table.

🚀 Running the Backend with PM2 (Production Recommended)

Install PM2 globally:

npm install -g pm2

Start the backend server:

pm2 start index.js --name "backendAPI"

    This will launch your Node.js app using PM2.
    The backend will run on port 8800 as specified in .env.

🔗 End-to-End Connection

Once everything is set up:

    Frontend connects to the backend via http://localhost:8800

    Backend communicates with MySQL running on localhost:3308

    You can access your app via the frontend URL (e.g., served through Nginx)

📁 Project Structure

3-tier-app/
├── client/              # React.js frontend (Presentation Layer)
│   ├── build/           # Production build output
│   ├── src/             # Source code
│   │   └── pages/
│   │       └── config.js  # API URL configuration
│   └── package.json     # Frontend dependencies and scripts
│
├── backend/             # Node.js backend (Application Layer)
│   ├── index.js         # Entry point of backend server
│   ├── .env             # Environment variables
│   ├── test.sql         # MySQL table creation script
│   └── package.json     # Backend dependencies and scripts
│
└── README.md            # Project documentation
