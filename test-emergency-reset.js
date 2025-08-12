const axios = require('axios');

async function testEmergencyReset() {
    try {
        console.log("🧪 Testing emergency password reset...");
        
        // Test with a known user email that has scrypt password
        const resetData = {
            email: "shaiksameershubhan71@gmail.com",
            newPassword: "NewPassword123!"
        };
        
        console.log("📧 Attempting emergency reset for:", resetData.email);
        console.log("🔑 New password:", resetData.newPassword);
        
        const response = await axios.post('http://localhost:5000/api/user/emergency-reset', resetData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Emergency reset successful!");
        console.log("Response:", response.data);
        
        // Now test login with the new password
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
        
        console.log("✅ Login successful with new password!");
        console.log("Login response:", {
            user: loginResponse.data.user,
            hasTokens: !!(loginResponse.data.accessToken && loginResponse.data.refreshToken)
        });
        
    } catch (error) {
        console.error("❌ Test failed:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Error message:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
}

testEmergencyReset();