# Frontend-Backend Integration Guide

## 🚀 Complete Integration Setup

This guide walks you through fully integrating your frontend with the backend API.

## 📁 Files Updated

### Core Integration Files:
- `assets/js/auth.js` - Complete authentication system with API integration
- `assets/js/api-config.js` - API configuration and health checks
- `login.html` - Updated with API config script
- `signup.html` - Updated with API config script

### Backend Files (in `/backend` folder):
- `server.js` - Main server with all routes
- `controllers/authController.js` - Authentication logic
- `models/User.js` - User database model
- `middleware/auth.js` - Authentication middleware

## 🔧 Integration Features

### Authentication System
✅ **Login/Signup Forms** - Full API integration with real backend
✅ **Token Management** - Automatic JWT token handling
✅ **Session Persistence** - User stays logged in across sessions
✅ **Navigation Updates** - Dynamic nav based on auth state
✅ **Error Handling** - Comprehensive error messages and validation
✅ **Loading States** - Visual feedback during API calls

### Security Features
✅ **Password Validation** - Strength checking and requirements
✅ **Input Sanitization** - XSS and injection protection
✅ **Rate Limiting** - Backend protection against abuse
✅ **Secure Tokens** - JWT with expiration and verification

## 🛠️ Setup Instructions

### 1. Start the Backend Server
```bash
cd backend
npm run dev
```
The backend should be running on `http://localhost:5000`

### 2. Test API Connection
Open your browser console and check for:
```
✅ API Health Check Passed: {status: "OK", timestamp: "...", uptime: ...}
```

### 3. Test Authentication
Use these test credentials:
- **Email**: `test@example.com`
- **Password**: `password123`

Or create a new account with any valid data.

## 🎯 How It Works

### Login Process
1. User submits login form
2. Frontend validates input and shows loading state
3. API call to `/api/auth/login`
4. Backend validates credentials and returns JWT token
5. Frontend stores token and user data in localStorage
6. UI updates to show logged-in state
7. User redirected to dashboard

### Signup Process
1. User fills signup form
2. Frontend validates all fields and password strength
3. API call to `/api/auth/signup`
4. Backend creates user and returns JWT token
5. Frontend handles authentication state
6. User redirected to dashboard

### Session Management
- Tokens automatically included in all API requests
- User profile loaded on protected pages
- Automatic logout on token expiration
- Persistent login across browser sessions

## 📱 Responsive Integration

The integration works seamlessly across all devices:
- Mobile-friendly form layouts
- Touch-optimized buttons and inputs
- Responsive loading indicators
- Adaptive error messaging

## 🔍 Testing the Integration

### Manual Testing
1. Open `login.html` in your browser
2. Try logging in with test credentials
3. Check browser console for API responses
4. Verify successful redirect to dashboard
5. Test logout functionality

### Console Commands
```javascript
// Check if user is authenticated
console.log(api.isAuthenticated());

// View current user data
console.log(window.currentUser);

// Manually trigger logout
api.handleLogout();

// Check API health
checkApiHealth();
```

## 🚨 Troubleshooting

### Common Issues:

**"API Health Check Failed"**
- Ensure backend server is running (`npm run dev` in backend folder)
- Check if port 5000 is available
- Verify MongoDB connection (or use mock mode)

**"Login failed" or "Signup failed"**
- Check browser console for detailed error messages
- Verify backend server logs for specific errors
- Ensure all required fields are filled correctly

**"Not authorized to access this route"**
- User session may have expired
- Try logging in again
- Check if token was properly stored

### Debug Mode
Enable detailed logging by adding to your browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## 🌐 Production Deployment

### Backend Deployment:
1. Update `.env` with production values
2. Deploy to services like:
   - Heroku
   - AWS EC2
   - DigitalOcean
   - Railway
3. Configure MongoDB Atlas or similar

### Frontend Deployment:
1. Update `API_CONFIG.BASE_URL` in `api-config.js`
2. Deploy to:
   - Netlify
   - Vercel
   - GitHub Pages
   - Traditional hosting

### Environment Variables for Production:
```env
# Backend .env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-production-secret-key
FRONTEND_URL=https://yourdomain.com
```

## 📊 Monitoring

### Built-in Health Checks:
- API connectivity monitoring
- Automatic error detection
- User session validation
- Performance logging

### Browser Console Logs:
- API request/response details
- Authentication state changes
- Error messages and stack traces
- Performance timing

## 🆘 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify backend server is running
3. Test API endpoints directly with Postman/curl
4. Review server logs in the backend terminal

The integration is designed to be robust and provide clear error messages to help diagnose any issues quickly.