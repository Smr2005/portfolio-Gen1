const axios = require('axios');

async function fixUserLogin() {
    try {
        console.log("🔧 Fixing login for whatlead0089@gmail.com...");
        
        // Step 1: Use emergency reset to migrate password
        const resetData = {
            email: "whatlead0089@gmail.com",
            newPassword: "Lead0089!" // Using a secure version of the pattern from your config
        };
        
        console.log("📧 Attempting emergency reset for:", resetData.email);
        console.log("🔑 Setting new password:", resetData.newPassword);
        
        const resetResponse = await axios.post('http://localhost:5000/api/user/emergency-reset', resetData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Emergency reset successful!");
        console.log("Response:", resetResponse.data);
        
        // Step 2: Test login with the new password
        console.log("\n🧪 Testing login with new password...");
        
        const loginData = {
            email: resetData.email,
            password: resetData.newPassword
        };
        
        const loginResponse = await axios.post('http://localhost:5000/api/user/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Login successful!");
        console.log("User info:", loginResponse.data.user);
        console.log("Has access token:", !!loginResponse.data.accessToken);
        console.log("Has refresh token:", !!loginResponse.data.refreshToken);
        
        console.log("\n🎉 SUCCESS! You can now login with:");
        console.log(`   Email: ${resetData.email}`);
        console.log(`   Password: ${resetData.newPassword}`);
        
    } catch (error) {
        console.error("❌ Error occurred:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Error message:", error.response.data);
            
            // If emergency reset fails, let's check if user exists
            if (error.response.status === 422 && error.response.data.error === "User not found") {
                console.log("\n🔍 User not found. Let me check what users exist...");
                await checkUserExists();
            }
        } else {
            console.error("Network error:", error.message);
        }
    }
}

async function checkUserExists() {
    try {
        console.log("🔍 Checking if user exists in database...");
        
        // We'll create a simple script to check the database
        const mongoose = require("mongoose");
        require("dotenv").config();
        const User = require("./model/User");
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        const user = await User.findOne({ email: "whatlead0089@gmail.com" });
        
        if (user) {
            console.log("✅ User found in database:");
            console.log(`   Email: ${user.email}`);
            console.log(`   Name: ${user.name}`);
            console.log(`   Password format: ${user.password.startsWith('scrypt:') ? 'scrypt (needs migration)' : 'bcrypt (already migrated)'}`);
        } else {
            console.log("❌ User not found in database");
            console.log("📝 Available users with similar emails:");
            
            const similarUsers = await User.find({ 
                email: { $regex: /whatlead|lead/i } 
            }, { password: 0 });
            
            similarUsers.forEach(u => {
                console.log(`   - ${u.email} (${u.name || 'No name'})`);
            });
        }
        
        await mongoose.connection.close();
        
    } catch (dbError) {
        console.error("Database check error:", dbError.message);
    }
}

fixUserLogin();