const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import User model
const User = require("./model/User");

async function directPasswordReset() {
    try {
        console.log("🔧 Direct password reset for whatlead0089@gmail.com...");
        console.log("Connecting to MongoDB...");
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ Connected to MongoDB successfully");
        
        const userEmail = "whatlead0089@gmail.com";
        const newPassword = "Lead0089!";
        
        // Find the user
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            console.log("❌ User not found");
            return;
        }
        
        console.log(`👤 User found: ${user.email} (${user.name})`);
        
        // Hash the new password
        console.log("🔄 Hashing new password...");
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        
        // Update the user's password directly
        user.password = hashedPassword;
        user.resetToken = undefined; // Clear any existing reset tokens
        user.expireToken = undefined;
        
        await user.save();
        
        console.log("✅ Password updated successfully!");
        
        // Test the new password
        console.log("\n🧪 Testing new password...");
        const isValid = await user.isValidPassword(newPassword);
        console.log(`Password verification: ${isValid ? '✅ VALID' : '❌ Invalid'}`);
        
        if (isValid) {
            console.log("\n🎉 SUCCESS! Password reset complete!");
            console.log("You can now login with:");
            console.log(`   Email: ${userEmail}`);
            console.log(`   Password: ${newPassword}`);
            
            // Test actual login via API
            console.log("\n🧪 Testing actual login via API...");
            
            const axios = require('axios');
            const loginData = {
                email: userEmail,
                password: newPassword
            };
            
            try {
                const loginResponse = await axios.post('http://localhost:5000/api/user/login', loginData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log("✅ API Login successful!");
                console.log("User info:", loginResponse.data.user);
                console.log("Has tokens:", !!(loginResponse.data.accessToken && loginResponse.data.refreshToken));
                
            } catch (loginError) {
                console.error("❌ API Login failed:", loginError.response?.data || loginError.message);
            }
        }
        
    } catch (error) {
        console.error("❌ Direct reset error:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
        process.exit(0);
    }
}

directPasswordReset();