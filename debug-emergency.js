const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import User model
const User = require("./model/User");

async function debugEmergencyReset() {
    try {
        console.log("🔍 Debugging emergency reset logic...");
        console.log("Connecting to MongoDB...");
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ Connected to MongoDB successfully");
        
        const testEmail = "shaiksameershubhan71@gmail.com";
        const newPassword = "NewPassword123!";
        
        console.log(`\n🔍 Testing emergency reset logic for: ${testEmail}`);
        
        // Find the user
        const user = await User.findOne({ email: testEmail.toLowerCase() });
        
        if (!user) {
            console.log("❌ User not found");
            return;
        }
        
        console.log(`👤 User found: ${user.email}`);
        console.log(`🔑 Current password format: ${user.password.substring(0, 20)}...`);
        console.log(`📝 Is scrypt format: ${user.password.startsWith('scrypt:')}`);
        
        if (!user.password.startsWith('scrypt:')) {
            console.log("❌ User doesn't have scrypt password - emergency reset not needed");
            return;
        }
        
        console.log("\n🔄 Performing password migration...");
        
        // Hash new password with bcrypt
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        console.log(`🔑 New bcrypt hash: ${hashedPassword.substring(0, 20)}...`);
        
        // Update user password and fix missing name
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        
        // Fix missing name field
        if (!user.name) {
            user.name = user.email.split('@')[0]; // Use email prefix as name
            console.log(`🔧 Fixed missing name: ${user.name}`);
        }
        
        await user.save();
        
        console.log("✅ Password migrated successfully!");
        
        // Test the new password
        console.log("\n🧪 Testing new password...");
        const isValid = await user.isValidPassword(newPassword);
        console.log(`Password verification: ${isValid ? '✅ VALID' : '❌ Invalid'}`);
        
        if (isValid) {
            console.log(`\n🎉 SUCCESS! User can now login with:`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Password: ${newPassword}`);
        }
        
    } catch (error) {
        console.error("❌ Debug error:", error.message);
        console.error("Stack:", error.stack);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
        process.exit(0);
    }
}

debugEmergencyReset();