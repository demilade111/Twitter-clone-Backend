deployed endpoint :https://socialmedia-app-backend-1zp6.onrender.com/ 


# Google Sign-In Integration

## Overview

This application now supports authentication using Google Sign-In, enabling users to log in using their Google accounts. This feature leverages the OAuth 2.0 protocol for secure authentication and session management.

## Prerequisites

To use Google Sign-In, you'll need to:

1. Create a project in the [Google Developer Console](https://console.developers.google.com/).
2. Enable the Google+ API for your project.
3. Create credentials (OAuth client ID and client secret) for your application.

## Configuration

1. **Environment Variables**: Set the following environment variables with your Google OAuth credentials:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID.
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret.
   - `CALLBACK_URL`: The callback URL after Google authentication, e.g., `http://localhost:8000/auth/google/callback`.

2. **Callback URL**: Ensure that you've added your callback URL to the "Authorized redirect URIs" in your Google project's OAuth consent screen.

## Usage

To authenticate using Google, navigate to `/auth/google`. After successful authentication, you will be redirected to the callback URL defined in your environment variables.

## Session Management

User sessions are managed through `express-session`, allowing authenticated users to maintain their session state across different requests to the application. Ensure that you have configured the session secret and other relevant settings as per your security requirements.
