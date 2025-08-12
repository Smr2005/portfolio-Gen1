const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import User model
const User = require("./model/User");

async function migratePasswords() {
    try {
        console.log("🔄 Starting password migration for scrypt users...");
        console.log("Connecting to MongoDB...");
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ Connected to MongoDB successfully");
        
        // Find all users with scrypt passwords
        const scryptUsers = await User.find({ 
            password: { $regex: /^scrypt:/ } 
        });
        
        console.log(`\n📊 Found ${scryptUsers.length} users with scrypt passwords`);
        
        if (scryptUsers.length === 0) {
            console.log("✅ No scrypt passwords found. Migration not needed.");
            return;
        }
        
        // Option 1: Set a temporary password for all users
        const tempPassword = "TempPass123!"; // Users will need to reset this
        const hashedTempPassword = await bcrypt.hash(tempPassword, 12);
        
        console.log("\n🔄 Migrating passwords...");
        console.log(`📝 Setting temporary password: "${tempPassword}"`);
        console.log("⚠️  Users will need to reset their passwords after migration");
        
        let migratedCount = 0;
        
        for (const user of scryptUsers) {
            try {
                // Update password to bcrypt format
                user.password = hashedTempPassword;
                await user.save();
                
                console.log(`✅ Migrated: ${user.email}`);
                migratedCount++;
            } catch (error) {
                console.error(`❌ Failed to migrate ${user.email}:`, error.message);
            }
        }
        
        console.log(`\n🎉 Migration completed!`);
        console.log(`✅ Successfully migrated: ${migratedCount} users`);
        console.log(`❌ Failed migrations: ${scryptUsers.length - migratedCount} users`);
        
        console.log(`\n📧 IMPORTANT: All migrated users can now login with:`);
        console.log(`   Password: ${tempPassword}`);
        console.log(`\n⚠️  SECURITY NOTICE:`);
        console.log(`   1. Users should change their passwords immediately after login`);
        console.log(`   2. Consider sending password reset emails to all users`);
        console.log(`   3. You may want to force password reset on first login`);
        
        // List all migrated users
        console.log(`\n👥 Migrated users:`);
        scryptUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.email} (${user.name || 'No name'})`);
        });
        
    } catch (error) {
        console.error("❌ Migration error:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
        process.exit(0);
    }
}

// Ask for confirmation before running
console.log("⚠️  PASSWORD MIGRATION TOOL");
console.log("This will reset passwords for all users with scrypt hashes.");
console.log("Users will need to use the temporary password and then reset it.");
console.log("\nPress Ctrl+C to cancel, or wait 5 seconds to continue...");

setTimeout(() => {
    migratePasswords();
}, 5000);