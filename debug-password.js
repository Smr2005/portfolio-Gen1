const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import User model
const User = require("./model/User");

async function debugPassword() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ Connected to MongoDB successfully");
        
        // Get a specific user to debug
        const testEmail = "shaiksameershubhan71@gmail.com";
        const user = await User.findOne({ email: testEmail });
        
        if (!user) {
            console.log("❌ User not found");
            return;
        }
        
        console.log(`\n👤 User found: ${user.email}`);
        console.log(`📛 Name: ${user.name}`);
        console.log(`🔑 Password hash: ${user.password}`);
        console.log(`📅 Created: ${user.createdAt}`);
        console.log(`📝 Updated: ${user.updatedAt}`);
        
        // Test password verification with common passwords
        const testPasswords = [
            "testpassword",
            "password123",
            "123456",
            "password",
            "Lead0089", // Based on the MongoDB URI, this might be a pattern
            "sameer123",
            "shubhan123"
        ];
        
        console.log("\n🔍 Testing common passwords...");
        for (const testPassword of testPasswords) {
            try {
                const isValid = await user.isValidPassword(testPassword);
                console.log(`Password "${testPassword}": ${isValid ? '✅ VALID' : '❌ Invalid'}`);
                if (isValid) {
                    console.log(`🎉 FOUND WORKING PASSWORD: "${testPassword}"`);
                    break;
                }
            } catch (error) {
                console.log(`Password "${testPassword}": ❌ Error - ${error.message}`);
            }
        }
        
        // Also check if the password field is properly formatted
        console.log(`\n🔍 Password analysis:`);
        console.log(`Length: ${user.password.length}`);
        console.log(`Starts with $2b$ (bcrypt): ${user.password.startsWith('$2b$')}`);
        console.log(`Starts with $2a$ (bcrypt): ${user.password.startsWith('$2a$')}`);
        
        // Test manual bcrypt comparison
        console.log(`\n🧪 Manual bcrypt test with "testpassword":`);
        try {
            const manualTest = await bcrypt.compare("testpassword", user.password);
            console.log(`Manual bcrypt result: ${manualTest ? '✅ VALID' : '❌ Invalid'}`);
        } catch (error) {
            console.log(`Manual bcrypt error: ${error.message}`);
        }
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
        process.exit(0);
    }
}

debugPassword();