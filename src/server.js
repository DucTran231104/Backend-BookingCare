import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./config/connectDB";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import cors from 'cors';
require('dotenv').config();

let app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',   // React default port
        'http://localhost:3001',   // Alternative port
        'http://127.0.0.1:3000',   // Local IP variations
        true  // Allow all origins (use cautiously)
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Body parsing middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb' }));

// View engine setup
viewEngine(app);

// Initialize routes
initWebRouters(app);

// Database connection
connectDB();

// Start server
let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log(`Backend Nodejs is running on port: ${port}`);
});

export default app;