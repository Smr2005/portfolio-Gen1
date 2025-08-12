const axios = require('axios');

async function testLogin() {
    try {
        console.log("🧪 Testing login functionality...");
        
        // Test with a known user email from the database
        const loginData = {
            email: "shaiksameershubhan71@gmail.com", // This user exists in the database
            password: "testpassword" // You'll need to provide the correct password
        };
        
        console.log("📧 Attempting login with:", loginData.email);
        
        const response = await axios.post('http://localhost:5000/api/user/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Login successful!");
        console.log("Response:", response.data);
        
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

// Also test with a non-existent user to see the error message
async function testNonExistentUser() {
    try {
        console.log("\n🧪 Testing with non-existent user...");
        
        const loginData = {
            email: "nonexistent@example.com",
            password: "testpassword"
        };
        
        console.log("📧 Attempting login with:", loginData.email);
        
        const response = await axios.post('http://localhost:5000/api/user/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Unexpected success:", response.data);
        
    } catch (error) {
        console.error("❌ Expected error for non-existent user:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Error message:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
}

async function runTests() {
    await testLogin();
    await testNonExistentUser();
}

runTests();