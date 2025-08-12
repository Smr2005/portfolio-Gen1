const axios = require('axios');

async function testFullAuthFlow() {
    console.log("🧪 Testing complete authentication flow...\n");
    
    // Test 1: Server Health Check
    console.log("=== TEST 1: SERVER HEALTH CHECK ===");
    try {
        const healthResponse = await axios.get('http://localhost:5000/api/health');
        console.log("✅ Server is running");
        console.log("Server info:", {
            status: healthResponse.data.status,
            environment: healthResponse.data.environment,
            port: healthResponse.data.port
        });
    } catch (error) {
        console.error("❌ Server health check failed:", error.message);
        console.log("🚨 CRITICAL: Backend server is not running or not accessible");
        return;
    }
    
    // Test 2: Registration
    console.log("\n=== TEST 2: REGISTRATION ===");
    const testUser = {
        name: "Test User " + Date.now(),
        email: `testuser${Date.now()}@example.com`,
        password: "TestPassword123!"
    };
    
    try {
        console.log("📝 Attempting registration with:", {
            name: testUser.name,
            email: testUser.email,
            password: "***"
        });
        
        const registerResponse = await axios.post('http://localhost:5000/api/user/register', testUser, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Registration successful!");
        console.log("Response:", {
            user: registerResponse.data.user,
            hasTokens: !!(registerResponse.data.accessToken && registerResponse.data.refreshToken)
        });
        
        // Test 3: Login with newly registered user
        console.log("\n=== TEST 3: LOGIN WITH NEW USER ===");
        try {
            const loginData = {
                email: testUser.email,
                password: testUser.password
            };
            
            console.log("🔐 Attempting login with:", {
                email: loginData.email,
                password: "***"
            });
            
            const loginResponse = await axios.post('http://localhost:5000/api/user/login', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log("✅ Login successful!");
            console.log("Response:", {
                user: loginResponse.data.user,
                hasTokens: !!(loginResponse.data.accessToken && loginResponse.data.refreshToken)
            });
            
        } catch (loginError) {
            console.error("❌ Login failed:");
            console.error("Status:", loginError.response?.status);
            console.error("Error:", loginError.response?.data);
        }
        
    } catch (registerError) {
        console.error("❌ Registration failed:");
        console.error("Status:", registerError.response?.status);
        console.error("Error:", registerError.response?.data);
        
        if (registerError.response?.status === 409) {
            console.log("ℹ️  User already exists, trying login instead...");
            
            // Test 4: Login with existing user
            console.log("\n=== TEST 4: LOGIN WITH EXISTING USER ===");
            try {
                const loginData = {
                    email: testUser.email,
                    password: testUser.password
                };
                
                const loginResponse = await axios.post('http://localhost:5000/api/user/login', loginData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log("✅ Login with existing user successful!");
                console.log("Response:", {
                    user: loginResponse.data.user,
                    hasTokens: !!(loginResponse.data.accessToken && loginResponse.data.refreshToken)
                });
                
            } catch (existingLoginError) {
                console.error("❌ Login with existing user failed:");
                console.error("Status:", existingLoginError.response?.status);
                console.error("Error:", existingLoginError.response?.data);
            }
        }
    }
    
    // Test 5: Login with your specific user
    console.log("\n=== TEST 5: LOGIN WITH YOUR USER ===");
    try {
        const yourLoginData = {
            email: "whatlead0089@gmail.com",
            password: "Lead0089!"
        };
        
        console.log("🔐 Attempting login with your account:", {
            email: yourLoginData.email,
            password: "***"
        });
        
        const yourLoginResponse = await axios.post('http://localhost:5000/api/user/login', yourLoginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Your login successful!");
        console.log("Response:", {
            user: yourLoginResponse.data.user,
            hasTokens: !!(yourLoginResponse.data.accessToken && yourLoginResponse.data.refreshToken)
        });
        
    } catch (yourLoginError) {
        console.error("❌ Your login failed:");
        console.error("Status:", yourLoginError.response?.status);
        console.error("Error:", yourLoginError.response?.data);
    }
    
    // Test 6: Check database connection
    console.log("\n=== TEST 6: DATABASE CONNECTION ===");
    try {
        const mongoose = require("mongoose");
        require("dotenv").config();
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log("✅ MongoDB connection successful");
        
        const User = require("./model/User");
        const userCount = await User.countDocuments();
        console.log(`📊 Total users in database: ${userCount}`);
        
        await mongoose.connection.close();
        
    } catch (dbError) {
        console.error("❌ Database connection failed:", dbError.message);
    }
    
    console.log("\n=== SUMMARY ===");
    console.log("If any tests failed above, that's where the issue is.");
    console.log("Common issues:");
    console.log("1. Server not running → Start with: node index.js");
    console.log("2. MongoDB not connected → Check MONGO_URI in .env");
    console.log("3. CORS issues → Check frontend URL matches backend CORS settings");
    console.log("4. Password issues → Use password reset or emergency reset");
}

testFullAuthFlow();