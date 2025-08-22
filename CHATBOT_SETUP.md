# Chatbot Setup Guide

## Overview
The dashboard includes an AI-powered chatbot assistant that can help users with dashboard features, data visualization, and general application guidance.

## Features
- **Floating Chat Widget**: Accessible from any page when logged in
- **Conversation Management**: Create, view, and delete chat conversations
- **Fallback Responses**: Works even without OpenAI API configuration
- **Context Awareness**: Understands dashboard-related queries

## Setup Instructions

### 1. Basic Setup (Fallback Mode)
The chatbot works out of the box with predefined responses for common queries:
- Dashboard features and navigation
- Widget and chart information
- Analytics and data visualization help
- General application guidance

### 2. Enhanced Setup (OpenAI Integration)
For advanced AI responses, configure the OpenAI API:

1. **Get OpenAI API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create an account or sign in
   - Generate a new API key

2. **Configure Server**:
   - Open `server/.env` file
   - Replace `OPENAI_API_KEY=your_openai_api_key_here` with your actual API key
   - Example: `OPENAI_API_KEY=sk-proj-abc123...`

3. **Restart Server**:
   ```bash
   cd server
   npm start
   ```

## Usage

### Accessing the Chatbot
1. **Floating Widget**: Click the chat icon in the bottom-right corner
2. **Dedicated Page**: Navigate to `/chatbot` from the sidebar

### Sample Queries
- "How do I create a new dashboard?"
- "What widgets are available?"
- "Help me understand the analytics data"
- "How do I customize my dashboard?"

## Troubleshooting

### Common Issues

1. **Chatbot not responding**:
   - Check if the backend server is running
   - Verify MongoDB connection
   - Check browser console for errors

2. **"Failed to send message" error**:
   - Ensure you're logged in
   - Check network connection
   - Verify server is accessible at `http://localhost:5000`

3. **Limited responses**:
   - This is normal in fallback mode
   - Configure OpenAI API key for enhanced responses

### Server Requirements
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Internet connection (for OpenAI API)

## Technical Details

### Architecture
- **Frontend**: React with Material-UI components
- **Backend**: Express.js with MongoDB
- **AI**: OpenAI GPT-3.5-turbo (optional)
- **State Management**: React Context API

### API Endpoints
- `POST /api/chatbot/chat` - Send message
- `GET /api/chatbot/conversations` - Get user conversations
- `GET /api/chatbot/conversations/:id` - Get specific conversation
- `DELETE /api/chatbot/conversations/:id` - Delete conversation

### Security
- All chatbot endpoints require authentication
- API keys are stored securely in environment variables
- User conversations are isolated by user ID

## Support
For additional help or issues, please check the application logs or contact the development team.