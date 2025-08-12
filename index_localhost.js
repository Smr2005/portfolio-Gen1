const express = require("express");
const passport = require("passport");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const cors = require("cors");
const path = require("path");
//ROUTES
const authRoute = require("./routes/auth");
const portfolioRoute = require("./routes/portfolio");
const uploadRoute = require("./routes/upload");

//MODELS
require("./model/User");
require("./model/Portfolio");
require("./model/Feedback");

//CHORE
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Enable CORS for frontend communication
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = process.env.NODE_ENV === 'production' || process.env.PORT
            ? ["http://localhost:3000", "http://localhost:5000"]
            : ["http://localhost:3000", "http://localhost:3001"];
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(null, true); // Allow all origins for now to debug
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token', 'x-admin-secret', 'x-admin-username', 'x-admin-password', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
}));

//mongo connect
console.log("Attempting to connect to MongoDB...");
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => {
    console.log("✅ Connected to MongoDB successfully");
})
.catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("⚠️  Server will continue without database connection");
    // Don't exit, continue without database for now
});

// Handle MongoDB connection events
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

const {
    verifyAccessToken
} = require("./webToken/jwt");
const { upload } = require("./SERVICES/fileUploadService");
dotenv.config();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Handle preflight requests
app.options('*', cors());

//Route Middleware For Login And Signup routes
app.use("/api/user", authRoute);

//Route Middleware For Portfolio routes
app.use("/api/portfolio", portfolioRoute);

//Route Middleware For File Upload routes
app.use("/api/upload", uploadRoute);

//Route Middleware For Admin routes
const adminRoute = require("./routes/admin");
app.use("/api/admin", adminRoute);

//Route Middleware For User Profile routes
const userProfileRoute = require("./routes/userProfile");
app.use("/api/user-profile", userProfileRoute);

// Admin cleanup interface
app.get("/admin-cleanup", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-cleanup.html'));
});

// Admin simple interface (new simplified version)
app.get("/admin-simple", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-simple.html'));
});

// Admin secure interface (completely secure - no content before login)
app.get("/admin-secure", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-secure.html'));
});

// Admin test interface
app.get("/admin-test", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-test.html'));
});

// API health check route (moved after API routes)
app.get("/api/health", async (req, res, next) => {
    res.json({ 
        status: "Portfolio Generator Backend is running!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
        cors_origin: req.headers.origin,
        backend_url: "http://localhost:5000",
        frontend_url: "http://localhost:3000"
    });
});

// Test upload endpoint without authentication
app.post("/api/test-upload", upload.single('testFile'), (req, res) => {
    res.json({
        message: "Test upload endpoint working",
        file: req.file ? "File received" : "No file",
        headers: req.headers
    });
});

// Test data storage endpoint
app.get("/api/test-data-storage", (req, res) => {
    const testData = {
        profileImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...", // Sample base64 data
        resume: "data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO8w6...", // Sample base64 data
        projects: [
            {
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
                title: "Test Project"
            }
        ]
    };
    
    res.json({
        message: "Files are now stored as base64 data URLs in MongoDB",
        storageType: "MongoDB Base64",
        sampleData: testData,
        environment: process.env.NODE_ENV || 'development',
        backendUrl: "http://localhost:5000",
        frontendUrl: "http://localhost:3000",
        advantages: [
            "No file system dependencies",
            "Works on any hosting platform",
            "No file persistence issues",
            "All data in one database"
        ]
    });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production' || process.env.PORT) {
    // Serve static files from React build
    const buildPath = path.join(__dirname, 'client/build');
    console.log('Serving static files from:', buildPath);
    console.log('Directory exists:', require('fs').existsSync(buildPath));
    
    app.use(express.static(buildPath));
    
    // Add explicit file serving for common assets
    app.get('/static/*', (req, res, next) => {
        const filePath = path.join(buildPath, req.path);
        console.log('Serving static file:', filePath);
        if (require('fs').existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
}

// Catch-all handler: send back React's index.html file for client-side routing
if (process.env.NODE_ENV === 'production' || process.env.PORT) {
    app.get('*', (req, res) => {
        const buildPath = path.join(__dirname, 'client/build');
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Frontend URL: http://localhost:3000`);
    console.log(`🔧 Backend URL: http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`👨‍💼 Admin panel: http://localhost:${PORT}/admin-simple`);
});