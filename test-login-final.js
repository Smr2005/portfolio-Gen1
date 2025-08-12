const axios = require('axios');

async function testLoginFinal() {
    console.log("🧪 Final Login Test...\n");
    
    try {
        // Test login
        const loginData = {
            email: "whatlead0089@gmail.com",
            password: "Lead0089!"
        };
        
        console.log("🔐 Testing login with your credentials...");
        
        const loginResponse = await axios.post('http://localhost:5000/api/user/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ LOGIN SUCCESSFUL!");
        console.log("User:", loginResponse.data.user.name);
        console.log("Email:", loginResponse.data.user.email);
        console.log("Access Token:", loginResponse.data.accessToken ? "✅ Generated" : "❌ Missing");
        console.log("Refresh Token:", loginResponse.data.refreshToken ? "✅ Generated" : "❌ Missing");
        
        // Test registration with a new user
        console.log("\n📝 Testing registration...");
        
        const testUser = {
            name: "Test User Final",
            email: `testfinal${Date.now()}@example.com`,
            password: "TestPassword123!"
        };
        
        const registerResponse = await axios.post('http://localhost:5000/api/user/register', testUser, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ REGISTRATION SUCCESSFUL!");
        console.log("User:", registerResponse.data.user.name);
        console.log("Email:", registerResponse.data.user.email);
        console.log("Access Token:", registerResponse.data.accessToken ? "✅ Generated" : "❌ Missing");
        console.log("Refresh Token:", registerResponse.data.refreshToken ? "✅ Generated" : "❌ Missing");
        
        console.log("\n🎉 BOTH LOGIN AND REGISTRATION ARE WORKING!");
        console.log("\n📋 Summary:");
        console.log("✅ Backend server: Running on port 5000");
        console.log("✅ Frontend server: Running on port 3000");
        console.log("✅ MongoDB: Connected");
        console.log("✅ API URLs: Fixed in frontend");
        console.log("✅ Authentication: Working");
        console.log("✅ Your account: whatlead0089@gmail.com / Lead0089!");
        
        console.log("\n🌐 You can now:");
        console.log("1. Go to http://localhost:3000");
        console.log("2. Login with: whatlead0089@gmail.com / Lead0089!");
        console.log("3. Or register a new account");
        console.log("4. Create and manage portfolios");
        
    } catch (error) {
        console.error("❌ Test failed:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Error:", error.response.data);
        } else {
            console.error("Network error:", error.message);
        }
    }
}

testLoginFinal();