const axios = require('axios');

async function resetPasswordFlow() {
    try {
        console.log("🔄 Starting password reset flow for whatlead0089@gmail.com...");
        
        // Step 1: Request password reset
        console.log("\n📧 Step 1: Requesting password reset...");
        
        const resetRequest = {
            email: "whatlead0089@gmail.com"
        };
        
        const resetResponse = await axios.post('http://localhost:5000/api/user/reset-password', resetRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Password reset requested successfully!");
        console.log("Response:", resetResponse.data);
        
        // Extract the reset token from the response (for testing)
        const resetToken = resetResponse.data.resetToken;
        
        if (resetToken) {
            console.log(`\n🔑 Reset token: ${resetToken}`);
            
            // Step 2: Set new password using the token
            console.log("\n🔄 Step 2: Setting new password...");
            
            const newPasswordData = {
                token: resetToken,
                password: "Lead0089!" // New secure password
            };
            
            const newPasswordResponse = await axios.post('http://localhost:5000/api/user/new-password', newPasswordData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log("✅ New password set successfully!");
            console.log("Response:", newPasswordResponse.data);
            
            // Step 3: Test login with new password
            console.log("\n🧪 Step 3: Testing login with new password...");
            
            const loginData = {
                email: "whatlead0089@gmail.com",
                password: "Lead0089!"
            };
            
            const loginResponse = await axios.post('http://localhost:5000/api/user/login', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log("✅ Login successful!");
            console.log("User info:", loginResponse.data.user);
            console.log("Has tokens:", !!(loginResponse.data.accessToken && loginResponse.data.refreshToken));
            
            console.log("\n🎉 PASSWORD RESET COMPLETE!");
            console.log("You can now login with:");
            console.log(`   Email: whatlead0089@gmail.com`);
            console.log(`   Password: Lead0089!`);
            
        } else {
            console.log("⚠️  No reset token in response. Check server logs for the reset link.");
        }
        
    } catch (error) {
        console.error("❌ Error in password reset flow:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Error message:", error.response.data);
        } else {
            console.error("Network error:", error.message);
        }
    }
}

resetPasswordFlow();