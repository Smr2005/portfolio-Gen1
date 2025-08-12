const mongoose = require("mongoose");
require("dotenv").config();
require("./model/User");

const User = mongoose.model("User");

async function checkUsers() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        const users = await User.find({});
        console.log(`Found ${users.length} users:`);
        
        users.forEach(user => {
            console.log(`- ID: ${user._id}`);
            console.log(`  Name: ${user.name}`);
            console.log(`  Email: ${user.email}`);
            console.log(`  Created: ${user.createdAt}`);
            console.log("---");
        });
        
        if (users.length === 0) {
            console.log("No users found. You need to register a new account.");
        }
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.connection.close();
    }
}

checkUsers();