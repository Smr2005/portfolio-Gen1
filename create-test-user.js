const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
require("./model/User");

const User = mongoose.model("User");

async function createTestUser() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        // Check if test user already exists
        const existingUser = await User.findOne({ email: "test@portfolio.com" });
        if (existingUser) {
            console.log("Test user already exists!");
            console.log("Email: test@portfolio.com");
            console.log("Password: password123");
            return;
        }
        
        // Create new test user
        const hashedPassword = await bcrypt.hash("password123", 12);
        
        const testUser = new User({
            name: "Test Portfolio User",
            email: "test@portfolio.com",
            password: hashedPassword,
            createdAt: new Date()
        });
        
        await testUser.save();
        console.log("✅ Test user created successfully!");
        console.log("📧 Email: test@portfolio.com");
        console.log("🔑 Password: password123");
        console.log("");
        console.log("You can now log in with these credentials!");
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.connection.close();
    }
}

createTestUser();