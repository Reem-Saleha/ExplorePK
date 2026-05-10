# ExplorePK — Pakistan Tourism & Events Portal

A full-stack MERN web application for discovering Pakistani tourist attractions and events, with a Gemini AI-powered travel assistant (TravelBot).

**Live Demo:** https://explore-pk.vercel.app  
**Backend API:** https://explorepk-production.up.railway.app  
**GitHub:** https://github.com/Reem-Saleha/ExplorePK

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Axios, Bootstrap 5 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcrypt |
| AI | Google Gemini API (gemini-2.5-flash) |

---

## Features

- Browse and search Pakistani tourist attractions (filter by city, category, text)
- Discover and RSVP to upcoming events with real-time seat tracking
- Community reviews and star ratings for attractions
- Bookable nearby hotel cards with Booking.com links on attraction pages
- TravelBot — floating AI chat assistant for Pakistan-specific trip planning
- Admin CMS to create, edit, and delete attractions and events
- Role-based access control (user / admin)
- Fully responsive — mobile, tablet, and desktop

---

## Repository Structure

```
ExplorePK/
├── client/                  # React frontend
│   ├── public/              # Static assets + _redirects (Netlify)
│   └── src/
│       ├── components/      # Navbar, Footer, TravelBot, Cards, SearchBar
│       ├── context/         # AuthContext
│       ├── hooks/           # useAuth
│       ├── pages/           # 11 page components
│       ├── styles/          # CSS files
│       └── utils/           # Axios instance (api.js)
├── server/                  # Node.js/Express backend
│   ├── config/              # MongoDB connection
│   ├── controllers/         # Route logic (incl. aiController)
│   ├── middleware/          # protect, adminOnly, errorHandler
│   ├── models/              # User, Attraction, Event, Review, Registration
│   ├── routes/              # API routes (incl. aiRoutes)
│   ├── seeder.js            # Database seed script
│   └── server.js            # Entry point
├── .gitignore
└── README.md
```

---

## Local Setup

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account
- Google Gemini API key (free at aistudio.google.com)

### 1. Clone the repository
```bash
git clone https://github.com/Reem-Saleha/ExplorePK.git
cd ExplorePK
```

### 2. Configure Server Environment Variables
Create `server/.env`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/explorepk
JWT_SECRET=any_random_secret_string
JWT_EXPIRE=7d
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:3000
```

### 3. Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 4. Seed the database (recommended)
```bash
cd server
npm run seed
```
Creates:
- **Admin:** admin@explorepk.com / admin123
- **User:** user@explorepk.com / user123
- 5 sample attractions + 5 sample events

### 5. Run the app
Open two terminals:

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

Visit **http://localhost:3000**

---

## Pages

| # | Page | Access |
|---|---|---|
| 1 | Home — Hero slideshow, stats, featured attractions & events | Public |
| 2 | Attractions — Grid with city/category/search filters + pagination | Public |
| 3 | Attraction Detail — Gallery, Google Maps, hotel cards, reviews | Public |
| 4 | Events — Grid with category tabs and date/city filters | Public |
| 5 | Event Detail — RSVP, seat tracker, map modal | Public |
| 6 | Login | Unauthenticated |
| 7 | Register | Unauthenticated |
| 8 | User Dashboard — My registrations & reviews | Logged-in users |
| 9 | Admin Dashboard — Stats, user management, recent RSVPs | Admin only |
| 10 | Add / Edit Attraction | Admin only |
| 11 | Add / Edit Event | Admin only |

TravelBot AI chat widget is available on every page (bottom-right floating button).

---

## Deployment

### Backend — Render
1. New Web Service → connect `Reem-Saleha/ExplorePK`
2. Root Directory: `server` | Build: `npm install` | Start: `node server.js`
3. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `GEMINI_API_KEY`, `NODE_ENV=production`, `CLIENT_URL=<your-netlify-url>`

### Frontend — Netlify
1. New Site → import from GitHub → select `Reem-Saleha/ExplorePK`
2. Base directory: `client` | Build: `npm run build` | Publish: `client/build`
3. Add environment variable: `REACT_APP_API_URL=<your-render-url>/api`

---

## API Endpoints

| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/attractions` | Public |
| GET | `/api/attractions/:id` | Public |
| POST | `/api/attractions` | Admin |
| PUT | `/api/attractions/:id` | Admin |
| DELETE | `/api/attractions/:id` | Admin |
| GET | `/api/events` | Public |
| GET | `/api/events/:id` | Public |
| POST | `/api/events/:id/register` | Authenticated |
| POST | `/api/reviews` | Authenticated |
| DELETE | `/api/reviews/:id` | Owner / Admin |
| GET | `/api/stats` | Public |
| POST | `/api/ai/chat` | Public |

---

## Security

- Passwords hashed with bcryptjs
- JWT authentication with 7-day expiry
- Role-based middleware (`protect`, `adminOnly`)
- Gemini API key never exposed to client (server-side proxy)
- CORS restricted to known origins
- `.env` excluded from version control

---

*Submitted by Reem Saleha — Web Technologies Course, May 2026*
