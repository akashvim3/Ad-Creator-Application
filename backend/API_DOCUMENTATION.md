# AI Ad Creator Backend API Documentation

## Overview
RESTful API built with Node.js, Express, and MongoDB for the AI Ad Creator platform.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication via Bearer token in Authorization header or cookies.

## API Endpoints

### Authentication Routes

#### POST `/auth/signup`
Register a new user

**Request Body:**
```json
{
  "firstName": "Akash",
  "lastName": "Vimal",
  "email": "xyz@example.com",
  "password": "password123",
  "company": "Acme Inc"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "firstName": "Akash",
    "lastName": "Vimal",
    "email": "xyz@example.com",
    "company": "Acme Inc",
    "role": "user"
  }
}
```

#### POST `/auth/login`
Login existing user

**Request Body:**
```json
{
  "email": "xyz@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "firstName": "Akash",
    "lastName": "Vimal",
    "email": "xyz@example.com",
    "company": "Acme Inc",
    "role": "user",
    "subscription": {
      "plan": "free",
      "isActive": true
    }
  }
}
```

#### POST `/auth/logout`
Logout current user

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET `/auth/me`
Get current user profile (requires authentication)

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "firstName": "Akash",
    "lastName": "Vimal",
    "email": "xyz@example.com",
    "company": "Acme Inc",
    "role": "user",
    "subscription": {
      "plan": "free",
      "startDate": "2026-01-16T00:00:00.000Z",
      "endDate": null,
      "isActive": true
    },
    "profile": {
      "avatar": null,
      "bio": null,
      "phone": null,
      "website": null,
      "socialLinks": {
        "twitter": null,
        "linkedin": null,
        "facebook": null
      }
    },
    "preferences": {
      "theme": "auto",
      "notifications": {
        "email": true,
        "push": true
      },
      "language": "en"
    },
    "stats": {
      "adsCreated": 0,
      "totalSpent": 0,
      "lastLogin": "2026-01-16T14:58:18.017Z",
      "createdAt": "2026-01-16T14:58:18.017Z"
    }
  }
}
```

#### PUT `/auth/updatepassword`
Update user password (requires authentication)

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### POST `/auth/forgotpassword`
Request password reset

**Request Body:**
```json
{
  "email": "xyz@example.com"
}
```

### Health Check

#### GET `/health`
Check API status

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-16T14:58:18.017Z",
  "uptime": 52.2495276
}
```

## Data Models

### User Model
```javascript
{
  firstName: String,           // Required
  lastName: String,            // Required
  email: String,               // Required, unique
  password: String,            // Required, hashed
  company: String,             // Optional
  role: String,                // 'user' | 'admin' | 'premium'
  subscription: {
    plan: String,              // 'free' | 'basic' | 'pro' | 'enterprise'
    startDate: Date,
    endDate: Date,
    isActive: Boolean
  },
  profile: {
    avatar: String,
    bio: String,
    phone: String,
    website: String,
    socialLinks: {
      twitter: String,
      linkedin: String,
      facebook: String
    }
  },
  preferences: {
    theme: String,             // 'light' | 'dark' | 'auto'
    notifications: {
      email: Boolean,
      push: Boolean
    },
    language: String
  },
  stats: {
    adsCreated: Number,
    totalSpent: Number,
    lastLogin: Date,
    createdAt: Date
  }
}
```

### Ad Model
```javascript
{
  userId: ObjectId,            // Required, references User
  title: String,               // Required
  description: String,         // Required
  headline: String,
  callToAction: String,        // Required
  targetAudience: {
    demographics: {
      ageRange: String,
      gender: String,
      location: [String],
      incomeLevel: String
    },
    interests: [String],
    behaviors: [String],
    painPoints: [String]
  },
  product: {
    name: String,              // Required
    category: String,
    keyBenefits: [String],
    uniqueSellingPoints: [String]
  },
  platform: String,            // Required
  tone: String,
  content: {
    headline: String,
    primaryText: String,
    description: String,
    additionalText: String
  },
  media: {
    images: [{
      url: String,
      alt: String,
      dimensions: {
        width: Number,
        height: Number
      }
    }],
    videos: [{
      url: String,
      thumbnail: String,
      duration: Number
    }]
  },
  status: String,              // 'draft' | 'generated' | 'published' | 'paused' | 'archived'
  performance: {
    impressions: Number,
    clicks: Number,
    conversions: Number,
    spend: Number,
    ctr: Number,
    cpc: Number
  },
  aiInsights: {
    engagementScore: Number,
    readability: Number,
    emotionalAppeal: Number,
    suggestions: [String]
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    {
      "msg": "First name is required",
      "param": "firstName",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role user is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:8000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ai-ad-creator

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# API Keys (for future integration)
OPENAI_API_KEY=your-openai-api-key-here
GOOGLE_ADS_API_KEY=your-google-ads-api-key-here
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your configuration

3. Start the development server:
```bash
npm run dev
```

4. The API will be available at `http://localhost:5000`

## Future Endpoints (Planned)

- **User Management**: `/api/users` - Profile updates, preferences
- **Ad Management**: `/api/ads` - Create, edit, delete ads
- **Analytics**: `/api/analytics` - Performance tracking and reporting
- **Templates**: `/api/templates` - Ad templates management
- **Billing**: `/api/billing` - Subscription and payment handling

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet.js security headers
- Input validation and sanitization
- Secure cookie handling