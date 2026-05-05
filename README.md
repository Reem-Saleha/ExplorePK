# ExplorePK - Tourism & Events Portal

A full-stack MERN application for discovering Pakistani tourist attractions and events.

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account

### 1. Configure Environment Variables

**Server** — edit `server/.env`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/explorepk
JWT_SECRET=explorepk_jwt_secret_key_2026
JWT_EXPIRE=7d
PORT=5000
```

**Client** — `client/.env` is pre-configured for localhost.

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd client
npm install
```

### 4. Seed the Database (optional but recommended)
```bash
cd server
npm run seed
```
This creates:
- Admin: admin@explorepk.com / admin123
- User: user@explorepk.com / user123
- 5 sample attractions + 5 sample events

### 5. Run the App

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm start
```

Visit: http://localhost:3000

## Pages
1. Home — Hero, featured attractions, upcoming events
2. Attractions — Grid with filters (city, category, search)
3. Attraction Detail — Full info + map + reviews
4. Events — Grid with category tabs + filters
5. Event Detail — RSVP / seat tracker
6. Login
7. Register
8. User Dashboard — My registrations & reviews
9. Admin Dashboard — Stats + user management
10. Add/Edit Attraction (Admin)
11. Add/Edit Event (Admin)

## Tech Stack
- **Frontend:** React 18, React Router v6, Axios, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JWT + bcrypt

## GitHub Repository
[Add your GitHub link here]
