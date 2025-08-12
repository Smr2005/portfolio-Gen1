const mongoose = require("mongoose");
require("dotenv").config();

// Import User model
const User = require("./model/User");

async function debugUsers() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ Connected to MongoDB successfully");
        
        // Get all users
        const users = await User.find({});
        console.log(`\n📊 Total users in database: ${users.length}`);
        
        if (users.length > 0) {
            console.log("\n👥 Users found:");
            users.forEach((user, index) => {
                console.log(`${index + 1}. Email: ${user.email}, Name: ${user.name}, ID: ${user._id}`);
            });
        } else {
            console.log("\n❌ No users found in database");
        }
        
        // Check database connection state
        console.log(`\n🔗 MongoDB connection state: ${mongoose.connection.readyState}`);
        console.log("Connection states: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting");
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
        process.exit(0);
    }
}

debugUsers();