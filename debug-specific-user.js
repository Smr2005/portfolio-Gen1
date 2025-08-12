const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import User model
const User = require("./model/User");

async function debugSpecificUser() {
    try {
        console.log("🔍 Debugging whatlead0089@gmail.com...");
        console.log("Connecting to MongoDB...");
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ Connected to MongoDB successfully");
        
        // Check exact email
        const user = await User.findOne({ email: "whatlead0089@gmail.com" });
        
        if (user) {
            console.log("\n👤 User found:");
            console.log(`   Email: ${user.email}`);
            console.log(`   Name: ${user.name}`);
            console.log(`   ID: ${user._id}`);
            console.log(`   Password format: ${user.password.startsWith('scrypt:') ? 'scrypt' : 'bcrypt'}`);
            console.log(`   Password hash: ${user.password.substring(0, 30)}...`);
            console.log(`   Created: ${user.createdAt}`);
            console.log(`   Updated: ${user.updatedAt}`);
            
            // Test common passwords
            const testPasswords = [
                "Lead0089",
                "Lead@006789", // From admin credentials
                "whatlead0089",
                "password123",
                "Lead0089!",
                "sameer123"
            ];
            
            console.log("\n🔍 Testing common passwords...");
            for (const testPassword of testPasswords) {
                try {
                    const isValid = await user.isValidPassword(testPassword);
                    console.log(`Password "${testPassword}": ${isValid ? '✅ VALID' : '❌ Invalid'}`);
                    if (isValid) {
                        console.log(`\n🎉 FOUND WORKING PASSWORD: "${testPassword}"`);
                        break;
                    }
                } catch (error) {
                    console.log(`Password "${testPassword}": ❌ Error - ${error.message}`);
                }
            }
            
        } else {
            console.log("\n❌ User not found with exact email");
            
            // Check for similar emails
            console.log("\n🔍 Searching for similar emails...");
            const similarUsers = await User.find({ 
                email: { $regex: /whatlead|lead/i } 
            }, { password: 0 });
            
            if (similarUsers.length > 0) {
                console.log("📧 Found similar users:");
                similarUsers.forEach((u, index) => {
                    console.log(`${index + 1}. ${u.email} (${u.name || 'No name'}) - ID: ${u._id}`);
                });
            } else {
                console.log("❌ No similar users found");
            }
            
            // Check for typos in email
            const typoEmails = [
                "whatlead0089@gamil.com", // Common typo
                "whatlead0089@gmai.com",
                "whatlead089@gmail.com",
                "whatlead0089@yahoo.com"
            ];
            
            console.log("\n🔍 Checking for common email typos...");
            for (const typoEmail of typoEmails) {
                const typoUser = await User.findOne({ email: typoEmail });
                if (typoUser) {
                    console.log(`✅ Found user with typo: ${typoEmail} (Name: ${typoUser.name})`);
                }
            }
        }
        
    } catch (error) {
        console.error("❌ Debug error:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
        process.exit(0);
    }
}

debugSpecificUser();