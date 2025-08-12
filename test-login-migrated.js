const axios = require('axios');

async function testMigratedLogin() {
    try {
        console.log("🧪 Testing login with migrated password...");
        
        const loginData = {
            email: "shaiksameershubhan71@gmail.com",
            password: "NewPassword123!"
        };
        
        console.log("📧 Attempting login with:", loginData.email);
        console.log("🔑 Using migrated password");
        
        const response = await axios.post('http://localhost:5000/api/user/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Login successful!");
        console.log("User info:", response.data.user);
        console.log("Has access token:", !!response.data.accessToken);
        console.log("Has refresh token:", !!response.data.refreshToken);
        
        console.log("\n🎉 SOLUTION CONFIRMED!");
        console.log("The user can now login successfully with the new password.");
        
    } catch (error) {
        console.error("❌ Login failed:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Error message:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
}

testMigratedLogin();