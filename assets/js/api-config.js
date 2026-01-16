// API Configuration File
// This file contains all the configuration needed for API integration

const API_CONFIG = {
    // Backend API URL
    BASE_URL: 'http://localhost:5000/api',
    
    // Production API URL (uncomment when deploying)
    // BASE_URL: 'https://your-production-api.com/api',
    
    // Timeout for API requests (milliseconds)
    TIMEOUT: 10000,
    
    // Retry configuration
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
    
    // Authentication settings
    TOKEN_STORAGE_KEY: 'token',
    USER_STORAGE_KEY: 'user',
    
    // Test credentials for development
    TEST_CREDENTIALS: {
        email: 'test@example.com',
        password: 'password123'
    }
};

// Export for use in other files
window.API_CONFIG = API_CONFIG;

// Utility function to get API base URL
function getApiBaseUrl() {
    return API_CONFIG.BASE_URL;
}

// Utility function to check if API is reachable
async function checkApiHealth() {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Health Check Passed:', data);
            return true;
        }
        return false;
    } catch (error) {
        console.error('❌ API Health Check Failed:', error);
        return false;
    }
}

// Initialize API health check on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only check health on development pages
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
            checkApiHealth().then(isHealthy => {
                if (!isHealthy) {
                    console.warn('⚠️ Backend API is not responding. Some features may not work.');
                    // Optionally show a warning to the user
                    if (typeof notify !== 'undefined') {
                        notify.warning('Backend service unavailable. Some features may be limited.');
                    }
                }
            });
        }, 1000);
    }
});

// Make utilities available globally
window.getApiBaseUrl = getApiBaseUrl;
window.checkApiHealth = checkApiHealth;