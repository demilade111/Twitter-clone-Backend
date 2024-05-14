deployed endpoint :https://socialmedia-app-backend-1zp6.onrender.com/ 


# Social Media App

## Overview

This project is a Twitter-like social media application built using Express.js for the backend, Passport.js for Google OAuth authentication, and JWT for token-based authentication. The application allows users to register, authenticate via Google, post tweets, follow/unfollow other users, and interact with the tweets.

## Features

- User registration and authentication via Google OAuth
- JWT-based authentication
- Tweet creation, retrieval, and deletion
- Follow and unfollow functionality
- User profile management

## Tech Stack

- **Backend:** Node.js, Express.js
- **Authentication:** Passport.js (Google OAuth), JWT
- **Database:** MongoDB (or another suitable database)
- **Real-time Communication:** Socket.io (or another WebSocket library)
- **Containerization:** Docker

## Prerequisites

- Node.js (v14+)
- MongoDB
- Docker
- Google Developer account (for OAuth setup)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/social-media-app.git
cd social-media-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

### 4. Docker Setup

Ensure Docker is installed and running on your system. The `docker-compose.yml` file is already configured to set up the application and MongoDB containers.

To start the application using Docker, run:

```bash
docker-compose up --build
```

This command will build the Docker images and start the containers for the application and MongoDB.

### 5. API Endpoints

#### Authentication

- **Google OAuth Login:** `GET /auth/google`
- **Google OAuth Callback:** `GET /auth/google/callback`
- **JWT Token Refresh:** `POST /auth/refresh-token`

#### User

- **Get User Profile:** `GET /users/:id`
- **Follow User:** `POST /users/:id/follow`
- **Unfollow User:** `POST /users/:id/unfollow`

#### Tweet

- **Create Tweet:** `POST /tweets`
- **Get All Tweets:** `GET /tweets`
- **Get Tweet by ID:** `GET /tweets/:id`
- **Delete Tweet:** `DELETE /tweets/:id`

## Code Overview

### Directory Structure

```plaintext
social-media-app/
│
├── config/
│   └── passport.js       # Passport configuration
│
├── controllers/
│   ├── authController.js # Authentication logic
│   ├── tweetController.js # Tweet logic
│   └── userController.js # User logic
│
├── middlewares/
│   ├── authMiddleware.js  # JWT verification middleware
│   └── errorHandler.js    # Global error handler
│
├── models/
│   ├── User.js            # User model
│   └── Tweet.js           # Tweet model
│
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── tweetRoutes.js     # Tweet routes
│   └── userRoutes.js      # User routes
│
├── utils/
│   └── generateToken.js   # JWT token generation utility
│
├── .env                   # Environment variables
├── docker-compose.yml     # Docker configuration
├── app.js                 # Express application setup
├── package.json           # NPM dependencies and scripts
└── README.md              # Project documentation
```

### Sample Code

#### Passport Configuration (`config/passport.js`)

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
```

#### JWT Middleware (`middlewares/authMiddleware.js`)

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
```

#### Error Handler Middleware (`middlewares/errorHandler.js`)

```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = errorHandler;
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.



