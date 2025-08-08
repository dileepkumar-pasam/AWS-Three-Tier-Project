# 🌐 3-Tier Application Deployment on AWS

This repository demonstrates the deployment of a **3-tier web application** on **AWS Cloud**, including:

- **Presentation Layer**: React.js (Frontend)
- **Application Layer**: Node.js (Backend)
- **Data Layer**: MySQL (Local or AWS RDS)

---

## 📚 Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js  
- **Database**: MySQL  
- **Process Manager**: PM2  
- **Web Server (Optional)**: Nginx / Apache (Httpd)

---

## 🖥️ Frontend Setup (React)

> Make sure Node.js is installed on your system: https://nodejs.org/

### 1. Install Dependencies

    cd client
    npm install

### 2. Configure API Endpoint

Update the backend API URL in the frontend config file:

    vim src/pages/config.js

Example:

    // const API_BASE_URL = "http://120.40.8.367:80"; // For production
    const API_BASE_URL = "http://localhost:7700";     // For local development
    export default API_BASE_URL;

### 3. Build for Production

    npm run build

This will generate a production-ready app in the `client/build/` directory.  
Serve it via Nginx, Apache, or any static web server.

---

## 🛠️ Backend Setup (Node.js)

### 1. Install Dependencies

    cd backend
    npm install

### 2. Set Up Environment Variables

Create a `.env` file inside the `backend/` directory:

    vim .env

Example content:

    PORT=7700
    DB_HOST=localhost
    DB_USERNAME=root
    DB_PASSWORD=
    DB_NAME=3-tier-project
    DB_PORT=3306

> Adjust values for your local setup or AWS RDS configuration.

### 3. Create and Populate Database

Start MySQL (locally or via RDS), then run:

    mysql -h localhost -u root -P 3308 -p

Inside MySQL:

    CREATE DATABASE `3-tier-project`;
    USE `3-tier-project`;

Then, import the schema:

    mysql -h localhost -u root -P 3308 -p 3-tier-project < test.sql

> The `test.sql` file should include the required tables (e.g., `books` table).

---

## 🚀 Running Backend with PM2 (Recommended for Production)

### 1. Install PM2

    npm install -g pm2

### 2. Start Backend Server

    pm2 start index.js --name "backendAPI"

Your backend will run on port `7700` as configured in `.env`.

---

## 🔗 End-to-End Connection

| Component   | Connection                                |
|-------------|--------------------------------------------|
| Frontend    | Connects to Backend: http://localhost:7700 |
| Backend     | Connects to MySQL: localhost:3306          |
| Frontend UI | Serve from: client/build/ (e.g., via Nginx / Httpd)|

---

## 📁 Project Structure

    3-tier-app/
    ├── client/              # React.js frontend (Presentation Layer)
    │   ├── build/           # Production build output
    │   ├── src/             # Source code
    │   │   └── pages/
    │   │       └── config.js  # API URL configuration
    │   └── package.json     # Frontend dependencies and scripts
    │
    ├── backend/             # Node.js backend (Application Layer)
    │   ├── index.js         # Backend entry point
    │   ├── .env             # Environment variables
    │   ├── test.sql         # MySQL table creation script
    │   └── package.json     # Backend dependencies and scripts
    │
    └── README.md            # Project documentation

---


## 🧑‍💻 Author

**Dileep Kumar**

---


## 📝 License

This project is open-source and available under the MIT License.
