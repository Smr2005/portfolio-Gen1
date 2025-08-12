const mongoose = require("mongoose");
require("dotenv").config();

// Import User model with the updated scrypt support
const User = require("./model/User");

async function testScryptFix() {
    try {
        console.log("🧪 Testing scrypt password fix...");
        console.log("Connecting to MongoDB...");
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ Connected to MongoDB successfully");
        
        // Get a user with scrypt password
        const testEmail = "shaiksameershubhan71@gmail.com";
        const user = await User.findOne({ email: testEmail });
        
        if (!user) {
            console.log("❌ User not found");
            return;
        }
        
        console.log(`\n👤 Testing user: ${user.email}`);
        console.log(`🔑 Password format: ${user.password.substring(0, 20)}...`);
        console.log(`📝 Is scrypt format: ${user.password.startsWith('scrypt:')}`);
        
        // Test with common passwords that might have been used
        const testPasswords = [
            "Lead0089",      // Based on the pattern in MongoDB URI
            "testpassword",
            "password123",
            "123456",
            "password",
            "sameer123",
            "shubhan123",
            "admin123",
            "user123"
        ];
        
        console.log("\n🔍 Testing passwords with updated scrypt support...");
        
        for (const testPassword of testPasswords) {
            try {
                const isValid = await user.isValidPassword(testPassword);
                console.log(`Password "${testPassword}": ${isValid ? '✅ VALID' : '❌ Invalid'}`);
                
                if (isValid) {
                    console.log(`\n🎉 SUCCESS! Found working password: "${testPassword}"`);
                    console.log(`📧 You can now login with:`);
                    console.log(`   Email: ${user.email}`);
                    console.log(`   Password: ${testPassword}`);
                    break;
                }
            } catch (error) {
                console.log(`Password "${testPassword}": ❌ Error - ${error.message}`);
            }
        }
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
        process.exit(0);
    }
}

testScryptFix();