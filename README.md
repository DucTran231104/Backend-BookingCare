# 🏥 BookingCare Backend API

> Backend services for the BookingCare platform – A comprehensive online medical appointment booking system.

![NodeJS](https://img.shields.io/badge/Node.js-18.x-green) ![Express](https://img.shields.io/badge/Express.js-4.x-blue) ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange) ![Sequelize](https://img.shields.io/badge/Sequelize-6.x-blueviolet)

## 📖 Table of Contents
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Database Configuration](#database-configuration)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## 🚀 Introduction
This repository contains the backend API for the BookingCare application. It handles authentication, doctor management, patient booking, and specialty categorization using a RESTful architecture. It is designed to consume data from a React Frontend.

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Core** | Node.js | JavaScript runtime environment |
| **Framework** | Express.js | Web framework for Node.js |
| **Database** | MySQL | Relational database management system |
| **ORM** | Sequelize | Promise-based Node.js ORM for MySQL |
| **Auth** | JWT & Bcrypt | JSON Web Token & Password hashing |
| **Template** | EJS | Embedded JavaScript templates |
| **Tooling** | Babel & Nodemon | Compiler & Development monitoring |

## 📋 Prerequisites
Before you begin, ensure you have met the following requirements:
* **Node.js**: v14.x or higher
* **MySQL**: Installed and running locally or on a server
* **npm** or **yarn**

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/bookingcare-backend.git](https://github.com/your-username/bookingcare-backend.git)
    cd bookingcare-backend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory based on your configuration (or `config/config.json`):
    ```env
    PORT=8081
    NODE_ENV=development
    DB_HOST=127.0.0.1
    DB_USERNAME=root
    DB_PASSWORD=your_password
    DB_DATABASE=bookingcare_db
    ```

## 🗄️ Database Configuration

1.  **Start MySQL** and ensure it is running.

2.  **Create Database** (if not already created via workbench)
    ```bash
    npx sequelize-cli db:create
    ```

3.  **Run Migrations** (Create tables)
    ```bash
    npx sequelize-cli db:migrate
    ```

4.  **Seed Data** (Insert sample data)
    ```bash
    npx sequelize-cli db:seed:all
    ```

## 🏃 Running the Application

* **Development Mode** (with Nodemon):
    ```bash
    npm start
    ```

* **Server Status:**
    The server will start at: `http://localhost:8081`

* **CORS Configuration:**
    The backend is configured to accept requests from:
    * `http://localhost:3000`
    * `http://localhost:3001`

## 📂 Folder Structure

```bash
src/
├── config/         # Database connection (Sequelize) & view engine config
├── controllers/    # Route logic (handles requests and sends responses)
├── migrations/     # Database schema changes (Sequelize)
├── models/         # Database models (Schema definitions)
├── routes/         # API Route definitions
├── services/       # Business logic (interactions with DB)
├── seeders/        # Initial data for the database
├── public/         # Static files
└── server.js       # Entry point of the application
