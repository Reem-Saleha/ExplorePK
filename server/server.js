require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const attractionRoutes = require('./routes/attractionRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');

connectDB();

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/attractions', attractionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

// Public stats — no auth required (used by Home page)
const Attraction = require('./models/Attraction');
const Event = require('./models/Event');
const User = require('./models/User');
const Registration = require('./models/Registration');
app.get('/api/stats', async (req, res) => {
  const [totalAttractions, totalEvents, totalUsers, totalRegistrations] = await Promise.all([
    Attraction.countDocuments(),
    Event.countDocuments(),
    User.countDocuments(),
    Registration.countDocuments()
  ]);
  res.json({ totalAttractions, totalEvents, totalUsers, totalRegistrations });
});

app.get('/', (req, res) => res.json({ message: 'ExplorePK API is running' }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
