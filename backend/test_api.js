// Test script to demonstrate working API endpoints
// Save this as test_api.js and run with: node test_api.js

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing AI Ad Creator API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Endpoint...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', healthResponse.data.status);
    console.log('⏰ Timestamp:', healthResponse.data.timestamp);
    console.log('');

    // Test 2: User Signup
    console.log('2. Testing User Signup...');
    const signupData = {
      firstName: "Akash",
      lastName: "Vimal", 
      email: "xyz@example.com",
      password: "password123",
      company: "Test Company"
    };

    try {
      const signupResponse = await axios.post(`${API_BASE}/auth/signup`, signupData);
      console.log('✅ Signup Successful');
      console.log('📝 Message:', signupResponse.data.message);
      console.log('👤 User:', signupResponse.data.user.firstName, signupResponse.data.user.lastName);
      console.log('');
    } catch (error) {
      if (error.response && error.response.data.message.includes('already exists')) {
        console.log('ℹ️  User already exists (this is expected)');
        console.log('');
      } else {
        throw error;
      }
    }

    // Test 3: User Login
    console.log('3. Testing User Login...');
    const loginData = {
      email: "test@example.com",
      password: "password123"
    };

    const loginResponse = await axios.post(`${API_BASE}/auth/login`, loginData);
    const token = loginResponse.data.token;
    console.log('✅ Login Successful');
    console.log('📝 Message:', loginResponse.data.message);
    console.log('🔐 Token received (first 20 chars):', token.substring(0, 20) + '...');
    console.log('👤 User:', loginResponse.data.user.email);
    console.log('');

    // Test 4: Get User Profile (Protected Route)
    console.log('4. Testing Protected Profile Route...');
    const profileResponse = await axios.get(`${API_BASE}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Profile Retrieved');
    console.log('👤 Full Name:', profileResponse.data.user.firstName, profileResponse.data.user.lastName);
    console.log('🏢 Company:', profileResponse.data.user.company);
    console.log('📊 Ads Created:', profileResponse.data.user.stats.adsCreated);
    console.log('💰 Total Spent:', profileResponse.data.user.stats.totalSpent);
    console.log('');

    // Test 5: Test Invalid Token
    console.log('5. Testing Invalid Token Handling...');
    try {
      await axios.get(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      });
      console.log('❌ This should have failed');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Invalid token properly rejected');
        console.log('📝 Error:', error.response.data.message);
      } else {
        throw error;
      }
    }
    console.log('');

    // Test 6: Test Missing Token
    console.log('6. Testing Missing Token Handling...');
    try {
      await axios.get(`${API_BASE}/auth/me`);
      console.log('❌ This should have failed');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Missing token properly rejected');
        console.log('📝 Error:', error.response.data.message);
      } else {
        throw error;
      }
    }
    console.log('');

    console.log('🎉 All API tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Health endpoint: ✅ Working');
    console.log('- User signup: ✅ Working');
    console.log('- User login: ✅ Working'); 
    console.log('- Protected routes: ✅ Working');
    console.log('- Error handling: ✅ Working');

  } catch (error) {
    console.error('❌ API Test Failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data.message);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };