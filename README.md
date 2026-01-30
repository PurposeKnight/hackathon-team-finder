# Dev-LFG (Looking For Group for Coders)

[![CI](https://github.com/YOUR_ACTUAL_USERNAME/dev-lfg/workflows/CI/badge.svg)](https://github.com/YOUR_ACTUAL_USERNAME/dev-lfg/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> A Tinder-style swiping app for developers to find partners for hackathons or side projects.

![Dev-LFG Demo](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Dev-LFG+Demo)

## Features

- **Swipe Interface**: Tinder-style card swiping to like/pass on developers
- **Smart Matching**: Complex matching logic that creates conversations when both users like each other
- **Tech Stack Filtering**: Filter potential matches by programming languages and technologies
- **Real-time Chat**: Socket.io powered messaging system for matched users
- **Profile Management**: Comprehensive developer profiles with tech stack, GitHub, LinkedIn

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Spring for smooth animations
- React Use Gesture for swipe interactions
- Socket.io Client for real-time features

### Backend
- Node.js with Express and TypeScript
- MongoDB with Mongoose ODM
- Socket.io for real-time messaging
- JWT authentication (ready to implement)

### Key Architecture Highlights

- **Shared Types**: Common TypeScript interfaces between frontend and backend
- **Match Service**: Core business logic for detecting mutual likes and creating matches
- **Real-time Updates**: Instant notifications for matches and messages
- **Scalable Database Design**: Optimized MongoDB schemas with proper indexing

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
npm run install:all
```

2. **Set up environment variables:**
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. **Start MongoDB** (if running locally):
```bash
mongod
```

4. **Seed the database with sample users:**
```bash
cd server
npx tsx src/seedData.ts
```

5. **Start the development servers:**
```bash
# From root directory
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:5173

## API Endpoints

### Users
- `GET /api/users/discover/:userId` - Get potential matches
- `GET /api/users/:id` - Get user profile
- `POST /api/users` - Create user profile
- `PUT /api/users/:id` - Update user profile

### Swiping & Matching
- `POST /api/swipe` - Handle like/pass actions
- `GET /api/swipe/matches/:userId` - Get user's matches

### Chat
- `GET /api/chat/:conversationId` - Get conversation messages
- `POST /api/chat/:conversationId/messages` - Send message

### Socket.io Events
- `join-conversation` - Join a chat room
- `send-message` - Send real-time message
- `new-message` - Receive new messages

## Core Matching Algorithm

The heart of Dev-LFG is the matching logic in `MatchService.checkForMatch()`:

1. User A swipes right (likes) User B
2. System checks if User B has already liked User A
3. If mutual like exists:
   - Create a new `Conversation` document
   - Create a `Match` record linking both users
   - Return match confirmation to frontend
4. If no mutual like, just store the like for future matching

## Database Schema

### User
- Profile information (name, bio, location)
- Tech stack array for filtering
- Social links (GitHub, LinkedIn)

### Like
- Tracks who liked whom
- Unique index prevents duplicate likes
- Used for match detection

### Match
- Created when mutual likes are detected
- Links to conversation for chat
- Immutable record of successful matches

### Conversation
- Contains all messages between matched users
- Supports real-time updates via Socket.io

## Development Notes

- **Type Safety**: Shared TypeScript types ensure consistency
- **Real-time**: Socket.io provides instant match notifications and chat
- **Scalability**: MongoDB indexes optimize query performance
- **Modern UI**: Smooth animations and responsive design
- **Extensible**: Easy to add features like video chat, project collaboration tools

## Future Enhancements

- [ ] JWT authentication system
- [ ] Image upload for profile pictures
- [ ] Advanced filtering (location, experience level)
- [ ] Project collaboration features
- [ ] Video chat integration
- [ ] Push notifications
- [ ] Mobile app with React Native

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project as a starting point for your own developer networking app!