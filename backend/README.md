# AI Ad Creator Backend

A robust RESTful API built with Node.js, Express, and MongoDB for the AI Ad Creator platform.

## Features

- 🔐 **Authentication**: JWT-based authentication with secure password hashing
- 🛡️ **Security**: Rate limiting, CORS protection, input validation
- 🗄️ **Database**: MongoDB with Mongoose ODM
- 📊 **Models**: User, Ad, and Analytics models with proper relationships
- 🔄 **Validation**: Express-validator for request validation
- 📈 **Scalable**: Modular architecture with clean separation of concerns

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the backend directory:
   ```bash
   cp .env.example .env
   ```

5. Configure your environment variables in `.env`:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-ad-creator
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Request password reset

### Health Check
- `GET /api/health` - API status and uptime

## Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── .env             # Environment variables
├── .env.example     # Environment variables template
├── server.js        # Main server file
├── package.json     # Dependencies and scripts
└── API_DOCUMENTATION.md  # API documentation
```

## Database Models

### User Model
- User authentication and profile management
- Subscription and billing information
- Preferences and settings
- Statistics tracking

### Ad Model
- Ad creation and management
- Target audience specification
- Platform-specific configurations
- Performance tracking
- AI-generated insights

### Analytics Model
- Detailed performance metrics
- Platform-specific analytics
- Audience demographics
- ROI and conversion tracking

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevent abuse with request limits
- **CORS Protection**: Controlled cross-origin requests
- **Input Validation**: Express-validator for data sanitization
- **Helmet.js**: Security headers and XSS protection
- **Secure Cookies**: HttpOnly and SameSite attributes

## Environment Variables

Refer to `.env.example` for all available configuration options:

- **Server Settings**: Port, environment, frontend URL
- **Database**: MongoDB connection URI
- **JWT**: Secret key and expiration
- **API Keys**: Third-party service integrations
- **Cloud Services**: Storage and CDN configurations

## Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Use a strong JWT secret
3. Configure production database
4. Set up SSL/HTTPS
5. Configure proper CORS origins
6. Set up monitoring and logging
7. Implement backup strategies

### Example Production .env
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=super-secret-production-key-here
FRONTEND_URL=https://yourdomain.com
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@aiadcreator.com or join our Discord community.

## Roadmap

- [ ] Implement full CRUD operations for ads
- [ ] Add real-time analytics streaming
- [ ] Integrate with AI services (OpenAI, etc.)
- [ ] Add payment processing
- [ ] Implement WebSocket connections
- [ ] Add comprehensive test suite
- [ ] Docker containerization
- [ ] API versioning

## API Documentation

Detailed API documentation is available in [API_DOCUMENTATION.md](API_DOCUMENTATION.md)