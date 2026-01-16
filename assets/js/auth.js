// API Client for Backend Integration
const API_BASE = 'http://localhost:5000/api';

// API Client Class
class ApiClient {
    constructor() {
        this.token = localStorage.getItem('token') || null;
        this.initializeAuthState();
    }

    // Initialize authentication state on page load
    initializeAuthState() {
        const user = localStorage.getItem('user');
        if (user && this.token) {
            try {
                window.currentUser = JSON.parse(user);
                this.updateUIForLoggedInUser(window.currentUser);
            } catch (e) {
                this.clearAuth();
            }
        }
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
        const url = `${API_BASE}${endpoint}`;
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
            this.setAuth(response.token, response.user);
        }
        
        return response;
    }

    async login(credentials) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        
        if (response.success && response.token) {
            this.setAuth(response.token, response.user);
        }
        
        return response;
    }

    async logout() {
        try {
            await this.request('/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearAuth();
        }
    }

    async getProfile() {
        return await this.request('/auth/me');
    }

    // Auth state management
    setAuth(token, user) {
        this.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        window.currentUser = user;
        this.updateUIForLoggedInUser(user);
    }

    clearAuth() {
        this.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete window.currentUser;
        this.updateUIForLoggedOutUser();
    }

    // UI Updates
    updateUIForLoggedInUser(user) {
        // Update navigation
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.innerHTML = `
                <div class="user-profile" id="userProfile">
                    <span>${user.firstName} ${user.lastName}</span>
                    <button class="btn-secondary" id="logoutBtn">Logout</button>
                </div>
            `;
            
            // Add logout event listener
            document.getElementById('logoutBtn')?.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }

    updateUIForLoggedOutUser() {
        // Restore original navigation
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.innerHTML = `
                <a href="login.html" class="btn-secondary">Login</a>
                <a href="signup.html" class="btn-primary">Get Started</a>
                <button class="mobile-toggle" id="mobileToggle">
                    <i class="fas fa-bars"></i>
                </button>
            `;
        }
    }

    // Logout handler
    async handleLogout() {
        try {
            await this.logout();
            notify.success('Logged out successfully!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } catch (error) {
            notify.error('Logout failed: ' + error.message);
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token && !!localStorage.getItem('user');
    }
}

// Initialize API client
const api = new ApiClient();

// DOM Loaded Event Listener
document.addEventListener('DOMContentLoaded', () => {
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const loginBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = loginBtn.innerHTML;
            
            try {
                // Show loading state
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
                loginBtn.disabled = true;

                const credentials = {
                    email: document.getElementById('loginEmail').value.trim(),
                    password: document.getElementById('loginPassword').value
                };

                // Validate input
                if (!credentials.email || !credentials.password) {
                    throw new Error('Please fill in all fields');
                }

                // Call API
                const response = await api.login(credentials);
                
                // Show success
                notify.success('Login successful! Welcome back.');
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                notify.error(error.message || 'Login failed. Please try again.');
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
            }
        });
    }

    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const signupBtn = signupForm.querySelector('button[type="submit"]');
            const originalText = signupBtn.innerHTML;
            
            try {
                // Show loading state
                signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
                signupBtn.disabled = true;

                const formData = {
                    firstName: document.getElementById('firstName').value.trim(),
                    lastName: document.getElementById('lastName').value.trim(),
                    email: document.getElementById('signupEmail').value.trim(),
                    password: document.getElementById('signupPassword').value,
                    company: document.getElementById('company').value.trim()
                };

                // Validate required fields
                if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
                    throw new Error('Please fill in all required fields');
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    throw new Error('Please enter a valid email address');
                }

                // Validate password strength
                if (formData.password.length < 6) {
                    throw new Error('Password must be at least 6 characters long');
                }

                // Check terms agreement
                const termsCheckbox = document.getElementById('terms');
                if (termsCheckbox && !termsCheckbox.checked) {
                    throw new Error('Please agree to the Terms of Service');
                }

                // Call API
                const response = await api.signup(formData);
                
                // Show success
                notify.success('Account created successfully! Welcome to AI AdCreator.');
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);

            } catch (error) {
                notify.error(error.message || 'Signup failed. Please try again.');
                signupBtn.innerHTML = originalText;
                signupBtn.disabled = false;
            }
        });

        // Password Strength Indicator (keeping your existing functionality)
        const passwordInput = document.getElementById('signupPassword');
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (passwordInput && strengthFill && strengthText) {
            passwordInput.addEventListener('input', () => {
                const password = passwordInput.value;
                const strength = calculatePasswordStrength(password);
                updatePasswordStrength(strength);
            });
        }
    }

    // Dashboard Authentication Check
    if (window.location.pathname.includes('dashboard.html') || 
        window.location.pathname.includes('create-ad.html') ||
        window.location.pathname.includes('analytics.html')) {
        
        if (!api.isAuthenticated()) {
            notify.error('Please log in to access this page');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            // Load user profile
            api.getProfile().then(response => {
                console.log('User profile loaded:', response.user);
            }).catch(error => {
                console.error('Failed to load profile:', error);
                if (error.message.includes('authorized')) {
                    api.clearAuth();
                    window.location.href = 'login.html';
                }
            });
        }
    }
});

// Password Toggle Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Calculate Password Strength
function calculatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    return strength;
}

// Update Password Strength Visual
function updatePasswordStrength(strength) {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (!strengthFill || !strengthText) return;

    const widths = ['0%', '20%', '40%', '60%', '80%', '100%'];
    const colors = ['#f5576c', '#fa709a', '#ffa500', '#43e97b', '#43e97b', '#43e97b'];
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

    strengthFill.style.width = widths[strength];
    strengthFill.style.background = colors[strength];
    strengthText.textContent = texts[strength] || 'Password strength';
    strengthText.style.color = colors[strength];
}
