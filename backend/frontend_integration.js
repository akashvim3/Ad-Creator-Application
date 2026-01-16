// Frontend JavaScript integration with backend API
// Place this in your frontend JavaScript files

class ApiClient {
  constructor(baseURL = 'http://localhost:5000/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token') || null;
  }

  // Set authorization header
  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication Methods
  async signup(userData) {
    const response = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    
    if (response.success && response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response.success && response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  async getProfile() {
    return await this.request('/auth/me');
  }

  async updatePassword(passwordData) {
    return await this.request('/auth/updatepassword', {
      method: 'PUT',
      body: JSON.stringify(passwordData)
    });
  }

  // Health check
  async healthCheck() {
    return await this.request('/health');
  }

  // Set token manually (for testing)
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Clear token
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

// Usage Examples:

// Initialize API client
const api = new ApiClient();

// Signup example
async function handleSignup(e) {
  e.preventDefault();
  
  const formData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('signupEmail').value,
    password: document.getElementById('signupPassword').value,
    company: document.getElementById('company').value
  };

  try {
    const response = await api.signup(formData);
    console.log('Signup successful:', response);
    // Redirect to dashboard or show success message
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error('Signup failed:', error);
    // Show error message to user
    alert(error.message);
  }
}

// Login example
async function handleLogin(e) {
  e.preventDefault();
  
  const credentials = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value
  };

  try {
    const response = await api.login(credentials);
    console.log('Login successful:', response);
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error('Login failed:', error);
    // Show error message to user
    alert(error.message);
  }
}

// Logout example
async function handleLogout() {
  try {
    await api.logout();
    console.log('Logged out successfully');
    // Redirect to login page
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

// Get user profile
async function loadUserProfile() {
  try {
    const response = await api.getProfile();
    console.log('User profile:', response.user);
    // Update UI with user data
    document.getElementById('userName').textContent = response.user.fullName;
  } catch (error) {
    console.error('Failed to load profile:', error);
    // Handle unauthorized access
    if (error.message.includes('authorized')) {
      window.location.href = 'login.html';
    }
  }
}

// Example of integrating with your existing auth.js
// Replace the existing auth handlers with these:

// In your signup form submit handler:
/*
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('signupEmail').value,
    password: document.getElementById('signupPassword').value,
    company: document.getElementById('company').value
  };

  try {
    const response = await api.signup(formData);
    notify.success('Account created successfully!');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  } catch (error) {
    notify.error(error.message);
  }
});
*/

// In your login form submit handler:
/*
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const credentials = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value
  };

  try {
    const response = await api.login(credentials);
    notify.success('Login successful!');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  } catch (error) {
    notify.error(error.message);
  }
});
*/

// Health check utility
async function checkApiHealth() {
  try {
    const response = await api.healthCheck();
    console.log('API Health:', response);
    return true;
  } catch (error) {
    console.error('API Health Check Failed:', error);
    return false;
  }
}

// Export for use in other files
window.ApiClient = ApiClient;
window.api = api;